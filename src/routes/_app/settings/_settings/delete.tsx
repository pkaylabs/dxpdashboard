import { createFileRoute, Outlet } from "@tanstack/react-router";
import AccountDeletionRequestPage from "../../-components/AccountDeletion";
import { useAccountDeletionMutation } from "@/redux/features/users/usersApiSlice";
import Swal from "sweetalert2";

export const Route = createFileRoute("/_app/settings/_settings/delete")({
  component: RouteComponent,
});

function RouteComponent() {
  const [deleteAccount] = useAccountDeletionMutation();

  const handleDelete = (request: any) => {
    // Handle the deletion request here
    console.log("Deletion request submitted:", request);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone. Do you want to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#17567E",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAccount("")
            .unwrap()
            .then(() => {
              Swal.fire({
                title: "Deleted!",
                text: "Your account has been deleted successfully.",
                icon: "success",
              });
            })
            .catch((error) => {
              console.error("Deletion error:", error);
              Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting your account. Please try again.",
                icon: "error",
              });
            });
        }
      });
    } catch (error) {
      console.error("Error handling deletion:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
      });
    }
  };

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
          // onSubmit={(request) => {
          //   console.log("Deletion request submitted:", request);
          //   // Handle the deletion request here
          // }}
          onSubmit={(request) => handleDelete(request)}
        />
      </div>
      <Outlet />
    </div>
  );
}
