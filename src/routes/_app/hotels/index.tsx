import { z } from "zod";
import Swal from "sweetalert2";
import Table from "@/components/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { generateVenueData } from "@/constants";
import { ActionButtons } from "../-components";

export const HotelSearch = z.object({
  name: z.string().catch("").optional(),
  address: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_app/hotels/")({
  validateSearch: (search) => HotelSearch.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const hotelData = generateVenueData();
  const navigate = useNavigate();

  const handleEdit = (item: any) => {
    navigate({
      to: "/hotels/add",
      search: {
        name: item.name,
        address: item.address,
      },
    });
  };

  const handleDelete = (item: any) => {
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
            Swal.fire({
              title: "Deleted!",
              text: "Hotel has been deleted.",
              icon: "success",
            });
          } catch (error: any) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text:
                error?.data?.message ??
                "An error occurred while deleting the reconciliation.",
              icon: "error",
            });
          }
        }
      });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error?.data?.message ?? "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  const tableData = hotelData.map((item) => ({
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
        {item.lastUpdated}
      </span>
    ),
    actions: (
      <ActionButtons
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(item)}
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

  const handleRowClick = (row: any, index: number) => {
    console.log("Row clicked: ", row, "Index:", index);
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
