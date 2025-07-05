import {
  Link,
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div className="font-inter h-screen flex flex-col gap-2 justify-center items-center bg-[#F0F8FF] ">
        <h2 className="font-medium text-[#06275A] text-xl ">The page you are reqeusting for cannot be found!</h2>
        <Link
          className="font-medium bg-[#06275A] py-2 px-8 rounded-lg text-white text-base  "
          to="/"
        >
          Start Over
        </Link>
      </div>
    );
  },
});
