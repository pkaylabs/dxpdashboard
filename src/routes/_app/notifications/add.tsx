import { ButtonLoader } from "@/components/loaders";
import * as Yup from "yup";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Field, Form, Formik } from "formik";
import Input from "@/components/elements/input";
import { NotificationSearch } from ".";
import { useAddNotificationsMutation } from "@/redux/features/notifications/notificationApiSlice";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  message: Yup.string()
    .min(3, "Message must be at least 3 characters")
    .required("Message is required"),
});

export const Route = createFileRoute("/_app/notifications/add")({
  validateSearch: (search) => NotificationSearch.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [addNotification, { isLoading: isAdding }] =
    useAddNotificationsMutation();

  const initialValues = {
    id: search?.id ?? "",
    title: search?.title ?? "",
    message: search?.message ?? "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await addNotification(values).unwrap();
      toast(
        JSON.stringify({
          type: "success",
          title: "Added Notification successfully",
        })
      );
      await navigate({ to: ".." });
    } catch (error) {
      console.error(error);
      toast(
        JSON.stringify({
          type: "error",
          title: "Notification creation failed!",
        })
      );
    }
  };

  return (
    <main className="font-inter">
      <div className="mb-5">
        <h1 className="font-medium text-2xl text-[#06275A] ">
          Add/Edit Notifications
        </h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <Field name="title">
                  {({ field }: import("formik").FieldProps) => (
                    <Input
                      {...field}
                      label="Title"
                      placeholder="Enter title"
                      error={
                        touched.title && errors.title ? errors.title : undefined
                      }
                      required
                      fullWidth
                    />
                  )}
                </Field>
              </div>
            </div>
            <Field name="message">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Message"
                  placeholder="Enter message"
                  error={
                    touched.message && errors.message
                      ? errors.message
                      : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>
            <div className="flex justify-end">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate({ to: ".." })}
                  type="button"
                  className="w-48 h-12 flex justify-center items-center bg-white cursor-pointer text-[#06275A] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-48 h-12 flex justify-center items-center bg-[#06275A] text-white cursor-pointer rounded-md hover:bg-[#06105a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold "
                >
                  {isAdding ? <ButtonLoader title="Saving..." /> : "Save"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
