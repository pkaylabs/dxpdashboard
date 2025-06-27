// import { motion } from "framer-motion";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Message2 } from "iconsax-react";
import Table from "@/components/table";
import { store } from "@/app/store";
import {
  notificationApiSlice,
  useGetNotificationsQuery,
} from "@/redux/features/notifications/notificationApiSlice";

export const Route = createFileRoute("/_app/notifications/")({
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
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  read?: string
}

const NotificationRow = ({
  notification,
  index,
}: {
  notification: Notification;
  index: number;
}) => {
  // const getNotificationIcon = (type: string) => {
  //   switch (type) {
  //     case "success":
  //       return "✅";
  //     case "warning":
  //       return "⚠️";
  //     case "error":
  //       return "❌";
  //     case "info":
  //       return "ℹ️";
  //     case "action":
  //       return "📋";
  //     default:
  //       return "📢";
  //   }
  // };

  console.log(index);

  return (
    <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
      {/* Icon */}
      <Message2 size="45" color="#99a1af" variant="Bold" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-base font-semibold text-[#06275A]">
              {notification.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {notification.message}
            </p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>{notification.date}</span>
              <span className="mx-2">•</span>
              <span>{notification.time}</span>
            </div>
          </div>

          {/* Unread indicator */}
          {!notification.read && (
            <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full ml-4"></div>
          )}
        </div>
      </div>
    </div>
  );
};

function RouteComponent() {
  const notifications = Route.useLoaderData();
  const { data = notifications } = useGetNotificationsQuery(undefined);
  // const navigate = useNavigate();

  const tableData = data.map((notification: Notification, index: number) => ({
    id: notification.id,
    notification: <NotificationRow notification={notification} index={index} />,
  }));

  const headers = [
    { name: "Notifications", value: "notification", width: "100%" },
  ];

  return (
    <div className="relative font-inter">
      <div className="absolute right-5 top-8 text-sm text-[#34C759] ">
        <button className="cursor-pointer p-1.5 rounded-sm hover:bg-gray-100 transition-all duration-150 ease-in-out ">
          Mark All as Read
        </button>
      </div>

      <Table
        displayHeader={false}
        headers={headers}
        rows={tableData}
        searchable={true}
        searchableFields={["notification.title", "notification.message"]}
        showAddButton={false}
        maxRows={10}
        striped={false}
        renderRow={(row) => row.notification}
        emptyStateMessage="No notifications found."
      />
    </div>
  );
}
