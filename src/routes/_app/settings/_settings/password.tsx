import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import { createFileRoute } from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const Route = createFileRoute("/_app/settings/_settings/password")({
  component: RouteComponent,
});

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

function RouteComponent() {
  const initialValues = {
    password: "",
    confrimPassword: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
  };
  return (
    <section className="font-inter w-full">
      <h2 className="font-medium text-xl text-[#06275A] ">
        Password settings{" "}
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
                  <Field name="password">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="password"
                        label="Enter New Password"
                        placeholder="Enter new password"
                        error={
                          touched.password && errors.password
                            ? errors.password
                            : undefined
                        }
                        helperText="Password must contain uppercase, lowercase, and number"
                        required
                        fullWidth
                      />
                    )}
                  </Field>
                </div>

                <div className="flex-1">
                  <Field name="confrimPassword">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        type="password"
                        label="Confirm New Password"
                        placeholder="Confirm your password"
                        error={
                          touched.confrimPassword && errors.confrimPassword
                            ? errors.confrimPassword
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
