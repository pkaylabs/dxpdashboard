import { z } from "zod";
import Swal from "sweetalert2";
import Table from "@/components/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ActionButtons } from "../-components";
import { store } from "@/app/store";
import {
  politicalSitesApiSlice,
  useDeletePoliticalSiteMutation,
  useGetPoliticalSitesQuery,
} from "@/redux/features/politicalSites/politicalSitesApiSlice";
import { useEffect } from "react";

export const PoliticalSearch = z.object({
  id: z.string().catch("").optional(),
  name: z.string().catch("").optional(),
  address: z.string().catch("").optional(),
  phone: z.string().catch("").optional(),
  description: z.string().catch("").optional(),
  email: z.string().email("Enter a valid email").catch("").optional(),
  landmark: z.string().catch("").optional(),
  custodian: z.string().catch("").optional(),
  category: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_app/political-sites/")({
  validateSearch: (search) => PoliticalSearch.parse(search),
  loader: async () => {
    const result = await store.dispatch(
      politicalSitesApiSlice.endpoints.getPoliticalSites.initiate(undefined)
    );
    if ("error" in result) {
      throw new Error("Failed to load political sites");
    }
    return result.data;
  },
  component: RouteComponent,
});

interface PoliticalSites {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  landmark: string;
  custodian: string;
  category: string;
  description: string;
  image: string;
  second_image: string;
  third_image: string;
  updated_at: string;
}

function RouteComponent() {
  const politicalData = Route.useLoaderData();
  const {
    data = politicalData,
    isLoading,
    isError,
    refetch,
  } = useGetPoliticalSitesQuery(undefined);
  const [deletePoliticalSite] = useDeletePoliticalSiteMutation();
  const navigate = useNavigate();

  const handleEdit = (item: PoliticalSites) => {
    navigate({
      to: "/political-sites/add",
      search: {
        id: String(item.id),
        name: item.name,
        address: item.address,
        phone: item.phone,
        description: item.description,
        email: item.email,
        landmark: item.landmark,
        custodian: item.custodian,
        category: item.category,
      },
    });
  };

  const handleDelete = async (id: number) => {
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
            await deletePoliticalSite({ id }).unwrap();
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Political has been deleted.",
              icon: "success",
            });
          } catch (error: unknown) {
            console.error(error);
            let errorMessage =
              "An error occurred while deleting the reconciliation.";
            interface ErrorWithMessage {
              data?: {
                message?: string;
              };
            }
            const err = error as ErrorWithMessage;
            if (
              typeof error === "object" &&
              error !== null &&
              "data" in error &&
              typeof err.data === "object" &&
              err.data !== null &&
              "message" in err.data
            ) {
              errorMessage = err.data?.message ?? errorMessage;
            }
            Swal.fire({
              title: "Error!",
              text: errorMessage,
              icon: "error",
            });
          }
        }
      });
    } catch (error: unknown) {
      console.log(error);
      let errorMessage = "An error occurred. Please try again.";
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: { message?: string } }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
      ) {
        errorMessage =
          (error as { data: { message?: string } }).data?.message ??
          errorMessage;
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading political sites.</div>;
  }
  const tableData = data?.map((item: PoliticalSites) => ({
    id: item.id,
    name: (
      <div className="font-inter flex items-center ">
        <span className=" text-[#06275A] text-base text-nowrap">
          {item.name}
        </span>
      </div>
    ),
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
    Address: item.address,
  }));

  const headers = [
    { name: "Name", value: "name", sortable: true, width: "300px" },
    { name: "Address", value: "address", sortable: true, width: "300px" },
    {
      name: "Last Updated",
      value: "lastUpdated",
      sortable: true,
      width: "180px",
    },
    { name: "Actions", value: "actions", width: "200px" },
  ];

  const handleAddVenue = () => {
    navigate({ to: "/political-sites/add" });
  };

  // const handleRowClick = (row: any, index: number) => {
  //   console.log("Row clicked: ", row, "Index:", index);
  // };
  const handleRowClick = () => {
    console.log("Row clicked: ");
  };
  return (
    <div>
      <Table
        headers={headers}
        rows={tableData}
        searchable={true}
        searchableFields={["Name", "Address"]}
        showAddButton={true}
        addButtonText="Add Political Site"
        onAddButtonClick={handleAddVenue}
        onRowClick={handleRowClick}
        maxRows={10}
        striped={true}
        stickyHeader={false}
        emptyStateMessage="No Political Sites found. Start by adding your first political site!"
      />
    </div>
  );
}
