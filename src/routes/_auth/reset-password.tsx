import { createFileRoute } from "@tanstack/react-router";
import ResetPasswordForm from "./-components/reset-passwoard-form";

export const Route = createFileRoute("/_auth/reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResetPasswordForm />;
}
