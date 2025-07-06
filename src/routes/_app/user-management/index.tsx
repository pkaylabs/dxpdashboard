import { z } from "zod";
import Swal from "sweetalert2";
import Table from "@/components/table";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ActionDropdown, { User } from "../-components";
import Avatar from "@/components/core/avatar";
import { Edit2, Eye, Trash } from "iconsax-react";
import ViewModal from "./-components/view-modal";
import { useEffect, useState } from "react";
import { store } from "@/app/store";
import moment from "moment";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  usersApiSlice,
} from "@/redux/features/users/usersApiSlice";

export const UserSearch = z.object({
  id: z.string().catch("").optional(),
  name: z.string().catch("").optional(),
  email: z.string().catch("").optional(),
  phone: z.string().catch("").optional(),
  address: z.string().catch("").optional(),
  avatar: z.string().catch("").optional(),
  bio: z.string().catch("").optional(),
  password: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_app/user-management/")({
  validateSearch: (search) => UserSearch.parse(search),
  loader: async () => {
    const result = await store.dispatch(
      usersApiSlice.endpoints.getUsers.initiate(undefined)
    );
    if ("error" in result) {
      throw new Error("Failed to load users");
    }
    return result.data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const userData = Route.useLoaderData();
  const { data = userData, refetch } = useGetUsersQuery(undefined);
  const [deletedUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const handleEdit = (item: User) => {
    navigate({
      to: "/user-management/add",
      search: {
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        // role: item.role,
        password: "",
        address: item.address,
        avatar: item.avatar,
        bio: item.bio,
      },
    });
  };
  const handleView = (item: User) => {
    navigate({
      to: ".",
      search: {
        name: item.name,
        email: item.email,
        address: item.address,
        phone: item.phone,
        avatar: item.avatar,
      },
    });
    setOpenView(true);
  };

  const handleDelete = (item: User) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#06275A",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deletedUser({ user: item.id });
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          } catch (error: unknown) {
            console.error(error);
            let errorMessage = "An error occurred while deleting the reconciliation.";
            if (
              typeof error === "object" &&
              error !== null &&
              "data" in error &&
              typeof (error as { data?: unknown }).data === "object" &&
              (error as { data?: unknown }).data !== null &&
              "message" in (error as { data?: { message?: unknown } }).data!
            ) {
              const message = (error as { data: { message?: unknown } }).data.message;
              if (typeof message === "string") {
                errorMessage = message;
              }
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
      Swal.fire({
        title: "Error!",
        text: (error as { data?: { message?: string } })?.data?.message ?? "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  const tableData = data.map((item: User) => ({
    id: item.id,
    name: (
      <div className="font-inter flex items-center gap-2">
        <div className="size-10 rounded-full overflow-hidden">
          <Avatar src={`https://api.bayelsaxp.com${item.avatar}`} alt={item.name} size="sm" />
        </div>
        <span className=" text-[#06275A] text-base text-nowrap">
          {item.name}
        </span>
      </div>
    ),
    email: (
      <span className="text-[#06275A] text-base text-nowrap">{item.email}</span>
    ),
    phone: (
      <span className="text-[#06275A] text-base text-nowrap">{item.phone}</span>
    ),
    address: (
      <span className="text-[#06275A] text-base text-nowrap">
        {item.address ? item.address : "No location specified"}
      </span>
    ),
    lastLogin: (
      <span className="text-[#06275A] text-base text-nowrap">
        {moment(item.last_login).format("MMM Do YY")}
      </span>
    ),
    actions: (
      <ActionDropdown
        actions={[
          {
            id: "view",
            label: "View Details",
            icon: <Eye size="18" color="#555555" variant="Bold" />,
            onClick: () => handleView(item),
          },

          {
            id: "edit",
            label: "Edit User",
            icon: <Edit2 size="18" color="#555555" variant="Bold" />,
            onClick: () => handleEdit(item),
          },

          {
            id: "delete",
            label: "Delete User",
            icon: <Trash size="18" color="#555555" variant="Bold" />,
            onClick: () => handleDelete(item),
            variant: "danger",
          },
        ]}
      />
    ),
    // Raw data for filtering
    Name: item.name,
    Email: item.email,
    Phone: item.phone,
  }));

  const headers = [
    { name: "Name", value: "name", sortable: true, width: "300px" },
    { name: "Email", value: "email", sortable: true, width: "300px" },
    {
      name: "Phone Number",
      value: "phone",
      sortable: true,
      width: "300px",
    },
    { name: "Location", value: "location", sortable: true, width: "200px" },
    { name: "Last Login", value: "lastLogin", sortable: true, width: "200px" },
    { name: "Actions", value: "actions", width: "200px" },
  ];

  const filters = [
    {
      name: "",
      fields: [""],
    },
  ];

  const handleAddVenue = () => {
    navigate({ to: "/user-management/add" });
  };

  // const handleRowClick = (row: User, index: number) => {
  //   console.log("Row clicked: ", row, "Index:", index);
  // };
  console.log(tableData)
  return (
    <>
      <Table
        headers={headers}
        rows={tableData}
        searchable={true}
        searchableFields={["Name", "Email", "Phone"]}
        filters={filters}
        showAddButton={true}
        addButtonText="Add User"
        onAddButtonClick={handleAddVenue}
        // onRowClick={handleRowClick}
        maxRows={10}
        striped={true}
        stickyHeader={false}
        emptyStateMessage="No users found. Start by adding your first user!"
      />
      <ViewModal open={openView} setOpen={setOpenView} />
    </>
  );
}
