import { createFileRoute, Outlet } from "@tanstack/react-router";
import AccountDeletionRequestPage from "../../-components/AccountDeletion";

export const Route = createFileRoute("/_app/settings/_settings/delete")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Delete Account
      </h1>
      <p className="text-gray-600 mb-6">
        Please proceed with caution. Deleting your account is irreversible.
      </p>
      <div className="w-full">
        <AccountDeletionRequestPage
          logoUrl=""
          appName="Destination Experience Platform"
          onSubmit={(request) => {
            console.log("Deletion request submitted:", request);
            // Handle the deletion request here
          }}
        />
      </div>
      <Outlet />
    </div>
  );
}
