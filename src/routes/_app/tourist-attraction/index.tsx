import { z } from "zod";
import Swal from "sweetalert2";
import Table from "@/components/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ActionButtons } from "../-components";
import { store } from "@/app/store";
import {
  touristApiSlice,
  useDeleteTouristSiteMutation,
  useGetTouristSitesQuery,
} from "@/redux/features/touristSites/touristSiteApiSlice";
import { useEffect } from "react";

export const VenueSearch = z.object({
  id: z.string().catch("").optional(),
  name: z.string().catch("").optional(),
  category: z.string().catch("").optional(),
  address: z.string().catch("").optional(),
  email: z.string().email("Enter a valid email").catch("").optional(),
  phone: z.string().catch("").optional(),
  description: z.string().catch("").optional(),
  landmark: z.string().catch("").optional(),
  mainImage: z.string().catch("").optional(),
  // additionalImages: z.string().array().catch("").optional(),
});

export const Route = createFileRoute("/_app/tourist-attraction/")({
  validateSearch: (search) => VenueSearch.parse(search),
  loader: async () => {
    const result = await store.dispatch(
      touristApiSlice.endpoints.getTouristSites.initiate(undefined)
    );
    if ("error" in result) {
      throw new Error("Failed to load tourist sites");
    }
    return result.data;
  },
  component: RouteComponent,
});

const CategoryBadge = ({ category }: { category: string }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "leisure/entertainment":
        return "bg-blue-100 text-[blue-800] border-blue-200";
      case "culture/nature":
        return "bg-green-100 text-green-800 border-green-200";
      case "entertainment":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border ${getCategoryColor(category)}`}
    >
      {category}
    </span>
  );
};

function RouteComponent() {
  type Venue = {
    id: number;
    name: string;
    category: string;
    address: string;
    email: string;
    phone: string;
    description: string;
    landmark: string;
    mainImage: string;
    additionalImages: string[];
    updated_at: string;
  };
  const preLoadedData = Route.useLoaderData() as Venue[];

  const {
    data = preLoadedData,
    isLoading,
    isError,
    refetch,
  } = useGetTouristSitesQuery(undefined);

  const [deleteTouristSite] = useDeleteTouristSiteMutation();

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  console.log("Preloaded Data:", preLoadedData);

  const navigate = useNavigate();

  const handleEdit = (item: Venue) => {
    navigate({
      to: "/tourist-attraction/add",
      search: {
        id: String(item.id),
        name: item.name,
        category: item.category,
        address: item.address,
        email: item.email,
        phone: item.phone,
        description: item.description,
        landmark: item.landmark,
        mainImage: item.mainImage,
        // additionalImages: item.additionalImages,
      },
    });
  };

  const handleDelete = (id: number) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#17567E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteTouristSite({ id }).unwrap();
            refetch(); // Refetch the data after deletion
            Swal.fire({
              title: "Deleted!",
              text: "Venue has been deleted.",
              icon: "success",
            });
          } catch (error: unknown) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text:
                typeof error === "object" &&
                error !== null &&
                "data" in error &&
                typeof (error as { data?: { message?: string } }).data
                  ?.message === "string"
                  ? (error as { data?: { message?: string } }).data?.message
                  : "An error occurred while deleting the reconciliation.",
              icon: "error",
            });
          }
        }
      });
    } catch (error: unknown) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text:
          typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message ===
            "string"
            ? (error as { data?: { message?: string } }).data?.message
            : "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading tourist sites.
      </div>
    );
  }

  const tableData = data?.map((item: Venue) => ({
    id: String(item.id),
    name: (
      <div className="font-inter flex items-center ">
        <span className=" text-[#06275A] text-base text-nowrap">
          {item.name}
        </span>
      </div>
    ),
    category: <CategoryBadge category={item.category} />,
    address: (
      <span className="text-[#06275A] text-base text-nowrap">
        {item.address}
      </span>
    ),
    lastUpdated: (
      <span className="text-[#06275A] text-base text-nowrap">
        {new Date(item.updated_at).toLocaleDateString()}
      </span>
    ),
    actions: (
      <ActionButtons
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(Number(item.id))}
      />
    ),
    // Raw data for filtering
    Name: item.name,
    Category: item.category,
    Address: item.address,
  }));

  const headers = [
    { name: "Name", value: "name", sortable: true, width: "300px" },
    { name: "Category", value: "category", sortable: true, width: "200px" },
    { name: "Address", value: "address", sortable: true, width: "300px" },
    {
      name: "Last Updated",
      value: "lastUpdated",
      sortable: true,
      width: "180px",
    },
    { name: "Actions", value: "actions", width: "200px" },
  ];

  // Filter options
  const filters = [
    {
      name: "Category",
      fields: ["Leisure/Entertainment", "Culture/Nature", "Entertainment"],
    },
  ];

  const handleAddVenue = () => {
    navigate({ to: "/tourist-attraction/add" });
  };

  const handleRowClick = (
    row: { [key: string]: React.ReactNode },
    index: number
  ) => {
    // If you want to access the raw data, you can use the raw fields (Name, Category, Address)
    console.log("Row clicked:", row, "Index:", index);
  };

  return (
    <div className="">
      {/* Statistics Cards */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Venues
          </h3>
          <p className="text-3xl font-bold text-[#06275A] ">{data.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Entertainment
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {data.filter((v: Venue) => v.category === "ENTERTAINMENT").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Culture/Nature
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {data.filter((v: Venue) => v.category === "Culture/Nature").length}
          </p>
        </div>
      </div>

      <Table
        headers={headers}
        rows={tableData}
        searchable={true}
        searchableFields={["Name", "Address", "Category"]}
        filters={filters}
        showAddButton={true}
        addButtonText="Add Venue"
        onAddButtonClick={handleAddVenue}
        onRowClick={handleRowClick}
        maxRows={10}
        striped={true}
        stickyHeader={false}
        emptyStateMessage="No venues found. Start by adding your first venue!"
      />
    </div>
  );
}
