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
  name: z.string().catch("").optional(),
  address: z.string().catch("").optional(),
  description: z.string().catch("").optional(),
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

  const handleEdit = (item: any) => {
    navigate({
      to: "/political-sites/add",
      search: {
        name: item.name,
        address: item.address,
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
            await deletePoliticalSite({ id }).unwrap();
            refetch();
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

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading political sites.</div>;
  }
  const tableData = data.map((item: any) => ({
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
