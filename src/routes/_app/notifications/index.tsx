import { generateNotificationData } from "@/constants";
import { motion } from "framer-motion";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Message2 } from "iconsax-react";
import Table from "@/components/table";

export const Route = createFileRoute("/_app/notifications/")({
  component: RouteComponent,
});

const NotificationRow = ({
  notification,
  index,
}: {
  notification: any;
  index: number;
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      case "action":
        return "📋";
      default:
        return "📢";
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
      {/* Icon */}
      <Message2 size="45" color="#99a1af" variant="Bold" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-[#06275A] mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {notification.message}
            </p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
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
  const notifications = generateNotificationData();
  const navigate = useNavigate();

  const tableData = notifications.map((notification, index) => ({
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
