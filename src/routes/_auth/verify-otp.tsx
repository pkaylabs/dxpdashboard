import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import VerifyOtpForm from "./-components/verify-otp-form";

const searchSchema = z.object({
  email: z.string().email(), 
});

export const Route = createFileRoute("/_auth/verify-otp")({

  validateSearch: searchSchema,

  component: RouteComponent,
});

function RouteComponent() {
  return <VerifyOtpForm />;
}
