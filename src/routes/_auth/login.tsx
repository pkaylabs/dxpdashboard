import { createFileRoute, redirect } from "@tanstack/react-router";
import LoginForm from "./-components/login-form";
import { z } from "zod";
import { store } from "@/app/store";

export const fallback = "/dashboard" as const;

export const Route = createFileRoute("/_auth/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ search }) => {
    if (store.getState().auth.token) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
