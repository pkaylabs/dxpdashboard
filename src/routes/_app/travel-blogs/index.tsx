import { z } from "zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Swal from "sweetalert2";
import { ActionButtons } from "../-components";
import Table from "@/components/table";
import { store } from "@/app/store";
import {
  travelBlogsApiSlice,
  useDeleteTravelBlogMutation,
  useGetTravelBlogsQuery,
} from "@/redux/features/travelBlogs/travelBlogsApiSlice";
import { useEffect } from "react";

export const TravelSearch = z.object({
  id: z.string().catch("").optional(),
  title: z.string().catch("").optional(),
  content: z.string().catch("").optional(),
  category: z.string().catch("").optional(),
  image: z.string().catch("").optional(),
  is_published: z.boolean().catch(false).optional(),
  subtitle: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_app/travel-blogs/")({
  validateSearch: (search) => TravelSearch.parse(search),
  loader: async () => {
    const result = await store.dispatch(
      travelBlogsApiSlice.endpoints.getTravelBlogs.initiate(undefined)
    );
    if ("error" in result) {
      throw new Error("Failed to load travel blogs");
    }
    return result.data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const travelBlogs = Route.useLoaderData(undefined);
  const { data = travelBlogs, refetch } = useGetTravelBlogsQuery(undefined);

  console.log(data);
  const [deleteBlog] = useDeleteTravelBlogMutation();
  const navigate = useNavigate();

  type BlogItem = {
    id: string;
    title: string;
    content: string;
    category?: string;
    feature_image?: string;
    is_published?: boolean;
    datePosted?: string;
    updated_at: string;
    description?: string;
    subtitle?: string;
  };

  useEffect(() => {
    if (data) {
      // Refetch the data when the component mounts
      refetch();
    }
  }, [data,refetch]);

  const handleEdit = (item: BlogItem) => {
    navigate({
      to: "/travel-blogs/add",
      search: {
        id: String(item.id),
        title: item.title,
        content: item.content,
        category: item.category,
        subtitle: item.subtitle,
        is_published: item.is_published,
        image: `https://api.bayelsaxp.com${item.feature_image}`,
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
            await deleteBlog({ blog: id }).unwrap();
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Blog has been deleted.",
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

  const tableData = data?.map((item: BlogItem) => ({
    id: String(item.id),
    title: (
      <div className="font-inter flex items-center ">
        <span className=" text-[#06275A] text-base text-nowrap">
          {item.title}
        </span>
      </div>
    ),
    category: (
      <span className="text-[#06275A] text-base text-nowrap">
        {item.category}
      </span>
    ),
    is_published: (
      <span className="text-[#06275A] flex items-center  text-base">
        {item.is_published ? "✅" : "❌"}
      </span>
    ),
    datePosted: (
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
    Name: item.content,
    Title: item.title,
  }));

  const headers = [
    { name: "title", value: "title", sortable: true, width: "300px" },
    { name: "Category", value: "category", sortable: true, width: "300px" },
    {
      name: "Is Published",
      value: "is_published",
      sortable: true,
      width: "300px",
    },
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

  const handleRowClick = (
    row: { [key: string]: React.ReactNode },
    index: number
  ) => {
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
