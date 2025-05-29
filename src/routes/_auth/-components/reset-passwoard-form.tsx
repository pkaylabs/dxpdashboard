import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/elements/input";
import { Link } from "@tanstack/react-router";
import { Route } from "../reset-password";
import { ArrowLeft } from "iconsax-reactjs";

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

const ResetPasswordForm: React.FC = () => {
  const initialValues = {
    password: "",
    confrimPassword: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-lg">
      <h2 className="text-3xl font-inter font-bold text-center mb-10 text-[#06275A] ">
        Reset Password
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            {/* Username Field */}
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

            {/* Password Field */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center bg-[#06275A] text-white  rounded-lg hover:bg-[#06105a]
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold mt-6"
            >
              Submit
            </button>

            <Link
              from={Route.fullPath}
              to={"/login"}
              className="flex justify-center items-center space-x-1.5 font-inter text-[#06275A]  "
            >
              <ArrowLeft size="20" color="#06275A" />
              <span>Back to login</span>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
