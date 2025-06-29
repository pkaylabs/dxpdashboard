/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, Fragment, useRef } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import toast, { Toast, useToaster } from "react-hot-toast";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import classNames from "@/utils/classnames";
import { wrapClick } from "@/utils/wrap-click";

const Toaster: FC = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        ref={useRef(null)}
        onMouseEnter={startPause}
        onMouseLeave={endPause}
        aria-live="assertive"
        className={classNames(
          // theme,
          "fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
        )}
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {toasts
            .filter((toast) => toast.visible)
            .map((toast) => (
              <Transition
                key={toast.id}
                show={true}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="max-w-sm w-full">
                  <AlertToaster key={toast.id} toast={toast} />
                </div>
              </Transition>
            ))}
        </div>
      </div>
    </>
  );
};

export default Toaster;

interface ToastComponentProps {
  toast: Toast;
}


const AlertToaster: FC<ToastComponentProps> = ({ toast: _toast }) => {
  const _toastMessage = JSON.parse(_toast.message as string);

  return (
    <div
      {..._toast.ariaProps}
      className={`max-w-sm w-full bg-gray-800 border border-gray-700 shadow-lg rounded-2xl pointer-events-auto overflow-hidden`}
    >
      <div className="p-4 flex">
        <div className="flex-shrink-0">
          {_toastMessage.type === "success" && (
            <IoMdCheckmarkCircleOutline
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          )}
          {_toastMessage.type === "error" && (
            <ExclamationCircleIcon
              className="h-6 w-6 text-red-400"
              aria-hidden="true"
            />
          )}
          {_toastMessage.type === "loading" && (
            <ArrowPathIcon
              className="h-6 w-6 text-gray-400 animate-spin"
              aria-hidden="true"
            />
          )}
          {_toastMessage.type === "notification" && (
            <BellIcon
              className="h-6 w-6 text-yellow-300"
              aria-hidden="true"
            />
          )}
          {_toastMessage.type === "warning" && (
            <ExclamationTriangleIcon
              className="h-6 w-6 text-orange-400"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white">
            {_toastMessage.title}
          </p>
          {_toastMessage.description && (
            <p className="mt-1 text-sm text-gray-300">
              {_toastMessage.description}
            </p>
          )}
          {_toastMessage.actions && (
            <div className="mt-3 flex space-x-4">
              <button className="text-sm font-medium text-blue-300 hover:text-blue-200">
                Undo
              </button>
              <button className="text-sm font-medium text-gray-400 hover:text-gray-300">
                Dismiss
              </button>
            </div>
          )}
        </div>

        <button
          className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-300"
          onClick={() => toast.dismiss(_toast.id)}
        >
          <span className="sr-only">Close</span>
          <IoIosCloseCircleOutline className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

