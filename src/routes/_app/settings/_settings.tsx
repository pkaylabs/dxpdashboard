import classNames from "@/utils/classnames";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdLock } from "react-icons/md";

export const Route = createFileRoute("/_app/settings/_settings")({
  component: RouteComponent,
});

const links = [
  {
    icon: FaRegUserCircle,
    label: "Profile Settings",
    href: "/settings/profile",
  },
  {
    icon: IoSettings,
    label: "Preferences Settings",
    href: "/settings/preferences",
  },
  {
    icon: MdLock,
    label: "Password Reset",
    href: "/settings/password",
  },
];

function RouteComponent() {
  return (
    <div className="font-inter flex gap-6">
      <div className="bg-white p-4 rounded-md w-full max-w-80 h-fit">
        <h4 className="font-medium text-[#06275A] text-xl ">
          Settings option{" "}
        </h4>

        <div className="mt-3">
          {links.map((item, index) => (
            <Link key={index} className="" to={item.href}>
              {({ isActive }) => {
                return (
                  <div
                    className={classNames(
                      isActive
                        ? "bg-primary-50 text-[#06275A] bg-[#D9D9D9] font-semibold"
                        : "text-[#06275A] hover:bg-[#d9d9d900] font-medium",
                      "group flex gap-x-3 rounded-lg p-3 text-sm mb-1 leading-6 capitalize"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        isActive
                          ? "text-[#06275A]"
                          : "text-[#06275A] group-hover:text-primary",
                        "h-5 w-5 shrink-0"
                      )}
                    />
                    {item.label}
                  </div>
                );
              }}
            </Link>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
