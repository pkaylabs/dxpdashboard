import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ArrowDown2, ArrowLeft, Element4, SearchNormal1 } from "iconsax-react";
import { TbLogout2 } from "react-icons/tb";
import { Link, Outlet, useMatchRoute, useRouter } from "@tanstack/react-router";
import { Route } from "@/routes/_app";
import { useAuth } from "@/services/auth";
import classNames from "@/utils/classnames";
import Avatar from "@/components/core/avatar";
import { navigations } from "@/constants";

const userNavigation = [
  { name: "Your profile", href: "/settings/profile" },
  { name: "Logout", href: "" },
];

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = Route.useNavigate();
  const matchRoute = useMatchRoute();
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: "/" });
        });
      });
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="font-inter relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#06275A] px-6 pb-4">
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigations.map((item, index) => (
                          <div key={index}>
                            <p className="font-semibold text-sm text-gray-400 ">
                              {item.category}{" "}
                            </p>

                            {item.tabs.map((itm, idx) => (
                              <li key={idx}>
                                <Link to={itm.href}>
                                  {({ isActive }) => {
                                    return (
                                      <div
                                        className={classNames(
                                          isActive
                                            ? "bg-primary-50 text-white font-semibold"
                                            : "text-gray-800 hover:bg-gray-50 hover:text-primary-600 font-medium",
                                          "group flex gap-x-3 rounded-xl px-5 py-3 text-sm  leading-6 capitalize"
                                        )}
                                      >
                                        <itm.icon
                                          aria-hidden="true"
                                          className={classNames(
                                            isActive
                                              ? "text-white"
                                              : "text-black group-hover:text-primary",
                                            "h-5 w-5 shrink-0"
                                          )}
                                        />
                                        {itm.name}
                                      </div>
                                    );
                                  }}
                                </Link>
                              </li>
                            ))}
                          </div>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#06275A] px-6 pb-4 pt-5">
            <nav className="flex flex-1 flex-col ">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-2">
                    {navigations.map((item, index) => (
                      <div className="" key={index}>
                        <p className="font-semibold text-sm text-gray-400 px-3 mt-5 mb-3">
                          {item.category}{" "}
                        </p>

                        {item.tabs.map((itm, idx) => (
                          <li key={idx}>
                            {itm.href ? (
                              <Link className="" to={itm.href}>
                                {({ isActive }) => {
                                  return (
                                    <div
                                      className={classNames(
                                        isActive
                                          ? "bg-primary-50 text-[#06275A] bg-[#D9D9D9] font-semibold"
                                          : "text-white hover:bg-[#d9d9d915] font-medium",
                                        "group flex gap-x-3 rounded-lg p-3 text-sm mb-1 leading-6 capitalize"
                                      )}
                                    >
                                      <itm.icon
                                        aria-hidden="true"
                                        className={classNames(
                                          isActive
                                            ? "text-[#06275A]"
                                            : "text-[#FFCC00] group-hover:text-primary",
                                          "h-5 w-5 shrink-0"
                                        )}
                                      />
                                      {itm.name}
                                    </div>
                                  );
                                }}
                              </Link>
                            ) : (
                              <button
                                onClick={handleLogout}
                                className="font-medium w-full group  flex gap-x-3 rounded-md p-3  text-white hover:bg-[#d9d9d915] "
                              >
                                <TbLogout2
                                  aria-hidden="true"
                                  className="size-6 shrink-0 text-[#FFCC00] group-hover:text-primary-600"
                                />
                                Logout
                              </button>
                            )}
                          </li>
                        ))}
                      </div>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-80 h-screen flex flex-col">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-[#F0F8FF] px-4 sm:gap-x-6 sm:px-6 lg:pr-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 lg:hidden"
            />

            <div className="font-inter flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="font-semibold  text-xl md:text-[1.75rem] text-gray-900 flex-1 flex items-center">
                {!!matchRoute({ to: "/dashboard" }) ? (
                  <div className="w-full md:max-w-1/2 flex  items-center gap-2 ">
                    <Element4 size="40" color="#06275A" variant="Bold" />
                    <div className="w-full h-11 rounded-lg border border-[#06275A] flex items-center gap-1.5 px-3">
                      <input
                        type="search"
                        name=""
                        id=""
                        placeholder="Search"
                        className="h-full flex-1 w-full outline-none border-none focus:outline-none placeholder:text-base placeholder:font-normal text-base"
                      />
                      <SearchNormal1 size={18} color="#06275A" />
                    </div>
                  </div>
                ) : !!matchRoute({ to: "/tourist-attraction" }) ? (
                  <h2 className="font-medium text-[#06275A] text-2xl ">
                    Tourist Attraction
                  </h2>
                ) : !!matchRoute({ to: "/hotels" }) ? (
                  <h2 className="font-medium text-[#06275A] text-2xl ">
                    Hotels
                  </h2>
                ) : !!matchRoute({ to: "/travel-blogs" }) ? (
                  <h2 className="font-medium text-[#06275A] text-2xl ">
                    Travel Blogs
                  </h2>
                ) : !!matchRoute({ to: "/notifications" }) ? (
                  <h2 className="font-medium text-[#06275A] text-2xl ">
                    Notifications
                  </h2>
                ) : !!matchRoute({ to: "/user-management" }) ? (
                  <h2 className="font-medium text-[#06275A] text-2xl ">
                    User Management
                  </h2>
                ) : !!matchRoute({ to: "/settings" }) ||
                  !!matchRoute({ to: "/settings/password" }) ||
                  !!matchRoute({ to: "/settings/preferences" }) ||
                  !!matchRoute({ to: "/settings/profile" }) ? (
                  <h2 className="font-medium text-[#06275A] text-2xl ">
                    Settings
                  </h2>
                ) : (
                  <Link
                    to=".."
                    className="bg-white border border-gray-200 rounded-md p-2"
                  >
                    <ArrowLeft size="20" color="#06275A" />
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex space-x-1 p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Avatar alt="Nana Kay" src={""} size="sm" />
                    <div className="text-left">
                      <p className="font-medium text-sm text-[#06275A] ">
                        {auth.user}
                      </p>
                      <p className="font-medium text-sm text-[#06275A] -mt-0.5 ">
                        admin@gmail.com
                      </p>
                    </div>
                    <span className="hidden lg:flex lg:items-start">
                      <ArrowDown2 size="18" color="#06275A" className="ml-2" />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <span
                      aria-hidden="true"
                      className="px-3 text-sm leading-none text-left font-semibold text-gray-900"
                    >
                      {auth.user} <br />
                    </span>
                    {userNavigation.map((item, idx) => (
                      <MenuItem key={item.name}>
                        <button
                          onClick={
                            idx === userNavigation.length - 1
                              ? handleLogout
                              : () => {
                                  navigate({ to: item.href });
                                }
                          }
                          className={`block w-full text-left px-3 py-1 text-sm/6 ${
                            idx === userNavigation.length - 1
                              ? "text-red"
                              : "text-gray-900"
                          }  data-[focus]:bg-gray-50 data-[focus]:outline-none`}
                        >
                          {item.name}
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="font-poppins flex-1">
            <div className="h-full p-4 sm:p-6 bg-[#F0F8FF] rounded-md">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
