import { createFileRoute, redirect } from "@tanstack/react-router";
import AppLayout from "./_app/-components/layout";
import { store } from "@/app/store";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ location }) => {
    // Check if the user is authenticated
    const { auth } = store.getState();

    if (!auth.token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AppLayout,
});
