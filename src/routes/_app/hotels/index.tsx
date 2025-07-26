import { z } from "zod";
import Swal from "sweetalert2";
import Table from "@/components/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ActionButtons } from "../-components";
import { store } from "@/app/store";
import {
  hotelApiSlice,
  useDeleteHotelMutation,
  useGetHotelsQuery,
} from "@/redux/features/hotels/hotelApiSlice";
import { useEffect } from "react";
import moment from "moment";

export const HotelSearch = z.object({
  id: z.string().catch("").optional(),
  name: z.string().catch("").optional(),
  address: z.string().catch("").optional(),
  description: z.string().catch("").optional(),
  category: z.string().catch("").optional(),
  email: z.string().email("Enter a valid email").catch("").optional(),
  phone: z.string().catch("").optional(),
  website: z.string().catch("").optional(),
  image: z.string().catch("").optional(),
  second_image: z.string().catch("").optional(),
  third_image: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_app/hotels/")({
  validateSearch: (search) => HotelSearch.parse(search),
  loader: async () => {
    const result = await store.dispatch(
      hotelApiSlice.endpoints.getHotels.initiate(undefined)
    );
    if ("error" in result) {
      throw new Error("Failed to load hotels");
    }
    return result.data;
  },
  component: RouteComponent,
});

interface HotelItem {
  id: number;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  category: string;
  updated_at: string;
  image: string;
  second_image: string;
  third_image: string;
}

function RouteComponent() {
  const hotelData = Route.useLoaderData();
  const { data = hotelData, refetch } = useGetHotelsQuery(undefined);
  const [deleteHotel] = useDeleteHotelMutation();
  const navigate = useNavigate();

  const handleEdit = (item: HotelItem) => {
    navigate({
      to: "/hotels/add",
      search: {
        id: String(item.id),
        name: item.name,
        address: item.address,
        category: item.category,
        email: item.email,
        description: item.description,
        phone: item.phone,
        website: item.website,
        image: `https://api.bayelsaxp.com${item.image}`,
        second_image: `https://api.bayelsaxp.com${item.second_image}`,
        third_image: `https://api.bayelsaxp.com${item.third_image}`,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [data, refetch]);

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
            await deleteHotel({ id }).unwrap();
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Hotel has been deleted.",
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
                  ? (error as { data?: { message?: string } }).data!.message
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
            ? (error as { data?: { message?: string } }).data!.message
            : "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  const tableData = data?.map((item: HotelItem) => ({
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
        {moment(item.updated_at).format("MMM Do YY")}
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
    navigate({ to: "/hotels/add" });
  };

  const handleRowClick = (
    row: { [key: string]: React.ReactNode },
    index: number
  ) => {
    console.log("Row clicked: ", row, "Index:", index);
    // If you need HotelItem, you can map back using hotelData if 'id' is present:
    // const hotel = hotelData.find(h => h.id === row.id);
  };

  return (
    <div>
      <Table
        headers={headers}
        rows={tableData}
        searchable={true}
        searchableFields={["Name", "Address"]}
        showAddButton={true}
        addButtonText="Add Hotel"
        onAddButtonClick={handleAddVenue}
        onRowClick={handleRowClick}
        maxRows={10}
        striped={true}
        stickyHeader={false}
        emptyStateMessage="No Hotels found. Start by adding your first hotel!"
      />
    </div>
  );
}
