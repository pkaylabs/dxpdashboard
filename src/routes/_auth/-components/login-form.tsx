import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/elements/input";
import { Link, useRouterState } from "@tanstack/react-router";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";

import { fallback, Route as LoginRoute } from "../login";
import { Route as ForgotPasswordRoute } from "../forgot-password";

import { ButtonLoader } from "@/components/loaders";
import { useAppDispatch } from "@/redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters")
    .min(5, "Email must be at least 5 characters")
    .required("email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

const LoginForm: React.FC = () => {
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
    // rememberMe: false,
  };
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = LoginRoute.useNavigate();
  const search = LoginRoute.useSearch();

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted:", values);

    try {
      const res = await login(values).unwrap();
      if (res?.token) {
        dispatch(setCredentials({ ...res }));
        toast.success("Login successfull");
        navigate({ to: search.redirect || fallback });
      } else {
        toast.error("Failed to login");
      }

      // Force‐revalidate any protected data
      // await router.invalidate();
    } catch (error: any) {
      console.error("Error logging in: ", error);
      toast.error("Login Failed");
    }
  };

  const isLoggingIn = isLoading || isLoginLoading;

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-lg">
      <h2 className="text-3xl font-inter font-bold text-center mb-10 text-[#06275A]">
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
            <Field name="email">
              {({ field }: any) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Enter your email"
                  error={
                    touched.email && errors.email ? errors.email : undefined
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
                <label className="ml-2 block text-[#06275A]">Remember me</label>
              </div>

              <Link
                from={LoginRoute.fullPath}
                to={ForgotPasswordRoute.fullPath}
                className="font-inter text-[#06275A] hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center bg-[#06275A] text-white rounded-lg hover:bg-[#06105a]
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold"
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
