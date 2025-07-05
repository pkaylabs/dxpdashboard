import { createFileRoute } from "@tanstack/react-router";
import ResetPasswordForm from "./-components/reset-passwoard-form";
import { z } from "zod";

const searchSchema = z.object({
  email: z.string().email(), 
});

export const Route = createFileRoute("/_auth/reset-password")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <ResetPasswordForm />;
}
