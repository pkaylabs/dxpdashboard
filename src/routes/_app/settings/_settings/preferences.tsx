import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import { createFileRoute } from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
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
  const initialValues = {
    email: "",
    phone: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
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
                    {({ field }: any) => (
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
                    {({ field }: any) => (
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
                    {false ? (
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
