import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/users/usersApiSlice";
import { createFileRoute } from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

export const Route = createFileRoute("/_app/settings/_settings/preferences")({
  component: RouteComponent,
});

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Phone must be at least 10 characters")
    .required("Phone is required"),
});

function RouteComponent() {
  const { data, refetch } = useGetUserProfileQuery(undefined);
  const [update, { isLoading: updating }] = useUpdateProfileMutation();

  const initialValues = {
    email: data?.preferred_notification_email ?? "",
    phone: data?.preferred_notification_phone ?? "",
  };

  // useEffect(() => {
  //   refetch();
  // }, [data, refetch]);

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("preferred_notification_email", values.email);
    formData.append("preferred_notification_phone", values.phone);
    try {
      await update(formData).unwrap();
      refetch();
      toast(
        JSON.stringify({
          type: "success",
          title: "Preferences updated successfully!",
        })
      );
    } catch (error) {
      toast(
        JSON.stringify({ type: "error", title: "Failed to update preferences" })
      );
      console.log(error);
    }
  };
  return (
    <section className="font-inter w-full">
      <h2 className="font-medium text-xl text-[#06275A] ">
        Preferences Information{" "}
      </h2>
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 mt-4">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <Field name="email">
                    {({ field }: import("formik").FieldProps) => (
                      <Input
                        {...field}
                        type="email"
                        label="Preferred Notification Email"
                        placeholder="Enter email"
                        error={
                          touched.email && errors.email
                            ? errors.email
                            : undefined
                        }
                        required
                        fullWidth
                      />
                    )}
                  </Field>
                </div>

                <div className="flex-1">
                  <Field name="phone">
                    {({ field }: import("formik").FieldProps) => (
                      <Input
                        {...field}
                        label="Preferred Notification Phone"
                        placeholder="Enter phone"
                        error={
                          touched.phone && errors.phone
                            ? errors.phone
                            : undefined
                        }
                        required
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="w-48 h-12 flex justify-center items-center bg-[#06275A] text-white cursor-pointer rounded-md hover:bg-[#06105a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold "
                  >
                    {updating ? (
                      <ButtonLoader title="Saving..." />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
