import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/elements/input";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { fallback, Route } from "../login";
import { useAuth } from "@/services/auth";
import { sleep } from "@/utils";
import { ButtonLoader } from "@/components/loaders";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});
// 
const LoginForm: React.FC = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  };

  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted:", values);

    setIsSubmitting(true);
    try {
      await auth.login(values.username);

      await router.invalidate();

      await sleep(1);

      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-lg">
      <h2 className="text-3xl font-inter font-bold text-center mb-10 text-[#06275A] ">
        Sign In
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            {/* Username Field */}
            <Field name="username">
              {({ field }: any) => (
                <Input
                  {...field}
                  label="Username"
                  placeholder="Enter your username"
                  error={
                    touched.username && errors.username
                      ? errors.username
                      : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>

            {/* Password Field */}
            <Field name="password">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
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

            <div className="flex justify-between items-center">
              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 block text-[#06275A] ">
                  Remember me
                </label>
              </div>

              <Link
                from={Route.fullPath}
                to={"/reset-password"}
                className=" font-inter text-[#06275A]  "
              >
                Forget Password ?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center bg-[#06275A] text-white  rounded-lg hover:bg-[#06105a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold "
            >
              {isLoggingIn ? <ButtonLoader title="Submitting..." /> : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
