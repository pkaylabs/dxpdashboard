import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/elements/input";

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

const LoginForm: React.FC = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Sign Up
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <Field
                type="checkbox"
                name="rememberMe"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-medium"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Already have an account? Sign In
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
