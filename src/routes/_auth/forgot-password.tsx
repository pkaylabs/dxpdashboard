import { createFileRoute } from "@tanstack/react-router";
import SendOtpForm from "./-components/send-otp-form";

export const Route = createFileRoute("/_auth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SendOtpForm />;
}
