import { z } from "zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { generateTravelData } from "@/constants";
import Swal from "sweetalert2";
import { ActionButtons } from "../-components";
import Table from "@/components/table";

export const TravelSearch = z.object({
  title: z.string().catch("").optional(),
  writer: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_app/travel-blogs/")({
  validateSearch: (search) => TravelSearch.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const blogData = generateTravelData();
  const navigate = useNavigate();

  const handleEdit = (item: any) => {
    navigate({
      to: "/travel-blogs/add",
      search: {
        title: item.title,
        writer: item.writer,
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
              text: "Blog has been deleted.",
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

  const tableData = blogData.map((item) => ({
    id: item.id,
    writer: (
      <div className="font-inter flex items-center ">
        <span className=" text-[#06275A] text-base text-nowrap">
          {item.writer}
        </span>
      </div>
    ),
    title: (
      <span className="text-[#06275A] text-base text-nowrap">{item.title}</span>
    ),
    datePosted: (
      <span className="text-[#06275A] text-base text-nowrap">
        {item.datePosted}
      </span>
    ),
    actions: (
      <ActionButtons
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(item)}
      />
    ),
    // Raw data for filtering
    Name: item.writer,
    Title: item.title,
  }));

  const headers = [
    { name: "Writers", value: "writer", sortable: true, width: "300px" },
    { name: "Blog Articles", value: "title", sortable: true, width: "300px" },
    {
      name: "Date Posted",
      value: "datePosted",
      sortable: true,
      width: "180px",
    },
    { name: "Actions", value: "actions", width: "200px" },
  ];

  const handleAddVenue = () => {
    navigate({ to: "/travel-blogs/add" });
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
        searchableFields={["Name", "Title"]}
        showAddButton={true}
        addButtonText="Add Blog"
        onAddButtonClick={handleAddVenue}
        onRowClick={handleRowClick}
        maxRows={10}
        striped={true}
        stickyHeader={false}
        emptyStateMessage="No Blogs found. Start by adding your first blog!"
      />
    </div>
  );
}
