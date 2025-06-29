import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import { useChangePasswordMutation } from "@/redux/features/users/usersApiSlice";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

export const Route = createFileRoute("/_app/settings/_settings/password")({
  component: RouteComponent,
});

const validationSchema = Yup.object({
  old_password: Yup.string().min(8, "Password must be at least 8 characters"),
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .required("Password is required"),
  new_password: Yup.string().min(8, "Password must be at least 8 characters"),
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Please confirm your password"),
});

function RouteComponent() {
  const navigate = useNavigate();
  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await changePassword(values);
      toast(
        JSON.stringify({
          type: "success",
          title: "Password changed successfully",
        })
      );
      navigate({ to: ".." });
    } catch (error) {
      console.log(error);
      toast(
        JSON.stringify({
          type: "error",
          title: "Faied to change password",
        })
      );
    }
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
              <Field name="old_password">
                {({ field }: import("formik").FieldProps) => (
                  <Input
                    {...field}
                    type="password"
                    label="Enter Old Password"
                    placeholder="Enter Old Password"
                    error={
                      touched.old_password && errors.old_password
                        ? errors.old_password
                        : undefined
                    }
                    helperText="Password must contain uppercase, lowercase, and number"
                    required
                    fullWidth
                  />
                )}
              </Field>
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <Field name="new_password">
                    {({ field }: import("formik").FieldProps) => (
                      <Input
                        {...field}
                        type="password"
                        label="Enter New Password"
                        placeholder="Enter new password"
                        error={
                          touched.new_password && errors.new_password
                            ? errors.new_password
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
                  <Field name="confirm_password">
                    {({ field }: import("formik").FieldProps) => (
                      <Input
                        {...field}
                        type="password"
                        label="Confirm New Password"
                        placeholder="Confirm your password"
                        error={
                          touched.confirm_password && errors.confirm_password
                            ? errors.confirm_password
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
                    {isChangingPassword ? (
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
