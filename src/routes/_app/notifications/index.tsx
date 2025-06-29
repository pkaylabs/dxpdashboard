import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Message2 } from "iconsax-react";
import Table from "@/components/table";
import { store } from "@/app/store";
import {
  notificationApiSlice,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "@/redux/features/notifications/notificationApiSlice";
import { ActionButtons } from "../-components";
import { z } from "zod";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const NotificationSearch = z.object({
  id: z.string().catch("").optional(),
  title: z.string().catch("").optional(),
  message: z.string().catch("").optional(),
});

export const Route = createFileRoute("/_app/notifications/")({
  validateSearch: (search) => NotificationSearch.parse(search),
  loader: async () => {
    const result = await store.dispatch(
      notificationApiSlice.endpoints.getNotifications.initiate(undefined)
    );
    if ("error" in result) {
      throw new Error("Failed to load notifications");
    }
    return result.data;
  },
  component: RouteComponent,
});

interface Notification {
  id: string;
  title: string;
  message: string;
}

// const NotificationRow = ({
//   notification,
//   search,
// }: {
//   notification: Notification;
//   index: number;
//   search: any;
// }) => {
//   // const getNotificationIcon = (type: string) => {
//   //   switch (type) {
//   //     case "success":
//   //       return "✅";
//   //     case "warning":
//   //       return "⚠️";
//   //     case "error":
//   //       return "❌";
//   //     case "info":
//   //       return "ℹ️";
//   //     case "action":
//   //       return "📋";
//   //     default:
//   //       return "📢";
//   //   }
//   // };
//   const navigate = useNavigate();

//   // const handleEdit = (notification: Notification) => {
//   //   navigate({
//   //     to: "/notifications/add",
//   //     search: {
//   //       id: search?.id,
//   //       title: search?.title,
//   //       message: search?.message,
//   //     },
//   //   });
//   // };

//   // const handleDelete = (id: number) => {
//   //   console.log(id);
//   // };

//   return (
//     <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
//       {/* Icon */}
//       <Message2 size="45" color="#99a1af" variant="Bold" />

//       {/* Content */}
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <h4 className="text-base font-semibold text-[#06275A]">
//               {notification.title}
//             </h4>
//             <p className="text-sm text-gray-600 line-clamp-2">
//               {notification.message}
//             </p>
//             {/* <div className="flex items-center mt-1 text-xs text-gray-500">
//               <span>{notification.date}</span>
//               <span className="mx-2">•</span>
//               <span>{notification.time}</span>
//             </div> */}
//           </div>

//           {/* Unread indicator */}
//           {/* {!notification.read && (
//             <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full ml-4"></div>
//           )} */}
//         </div>
//       </div>
//       {/* <ActionButtons
//         onEdit={() => handleEdit(notification)}
//         onDelete={() => handleDelete(Number(notification.id))}
//       /> */}
//     </div>
//   );
// };

function RouteComponent() {
  const navigate = useNavigate();
  const notifications = Route.useLoaderData();
  const { data = notifications, refetch } = useGetNotificationsQuery(undefined);
  const [deleteNotification] = useDeleteNotificationMutation();
  // const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const handleEdit = (notification: Notification) => {
    navigate({
      to: "/notifications/add",
      search: {
        id: String(notification?.id),
        title: notification?.title,
        message: notification?.message,
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
            await deleteNotification({ notification: id }).unwrap();
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Notification has been deleted.",
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

  const tableData = data.map((notification: Notification) => ({
    id: notification.id,
    // notification: <NotificationRow notification={notification} index={index} search={search} />,
    title: (
      <div className="font-inter flex items-center">
        <Message2 size="45" color="#99a1af" variant="Bold" />
        <h4 className="text-base font-semibold text-[#06275A]">
          {notification.title}
        </h4>
      </div>
    ),
    message: (
      <span className="text-[#06275A] text-base text-nowrap">
        {notification.message}
      </span>
    ),
    actions: (
      <ActionButtons
        onEdit={() => handleEdit(notification)}
        onDelete={() => handleDelete(Number(notification.id))}
      />
    ),
    Title: notification.title,
    Message: notification.message,
  }));

  const headers = [
    { name: "Title", value: "title", sortable: true, width: "300px" },
    { name: "Message", value: "message", sortable: true, width: "300px" },
    { name: "Actions", value: "actions", width: "200px" },
  ];

  const handleAddNotification = () => {
    navigate({ to: "/notifications/add" });
  };

  return (
    <div className="relative font-inter">
      {/* <div className="absolute right-5 top-8 text-sm text-[#34C759] ">
        <button className="cursor-pointer p-1.5 rounded-sm hover:bg-gray-100 transition-all duration-150 ease-in-out ">
          Mark All as Read
        </button>
      </div> */}

      <div>
        <Table
          headers={headers}
          rows={tableData}
          searchable={true}
          searchableFields={["Title", "Message"]}
          showAddButton={true}
          addButtonText="Add Notification"
          onAddButtonClick={handleAddNotification}
          // onRowClick={handleRowClick}
          maxRows={10}
          striped={true}
          stickyHeader={false}
          emptyStateMessage="No Notifications found. Start by adding your first notification!"
        />
      </div>
    </div>
  );
}
