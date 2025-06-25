import { z } from "zod";
import Swal from "sweetalert2";
import Table from "@/components/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { generateVenueData } from "@/constants";
import { ActionButtons } from "../-components";

export const PoliticalSearch = z.object({
  name: z.string().catch("").optional(),
  address: z.string().catch("").optional(),
  description: z.string().catch("").optional()
});

export const Route = createFileRoute("/_app/political-sites/")({
  validateSearch: (search) => PoliticalSearch.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const politicalData = generateVenueData();
  const navigate = useNavigate();

  const handleEdit = (item: any) => {
    navigate({
      to: "/political-sites/add",
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
              text: "Political has been deleted.",
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

  const tableData = politicalData.map((item) => ({
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
    navigate({ to: "/political-sites/add" });
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
