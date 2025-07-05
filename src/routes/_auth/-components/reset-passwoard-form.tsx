import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/elements/input";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft } from "iconsax-reactjs";

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase")
    .matches(/[a-z]/, "Must contain at least one lowercase")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_auth/reset-password" });
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (search.email) {
      setEmail(search.email);
    }
  }, [search.email]);

  const initialValues: ResetPasswordValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: ResetPasswordValues) => {
    if (!email) {
      console.error("No email in search params; cannot reset password.");
      return;
    }
    navigate({ to: "/dashboard" });
    console.log("Resetting password for:", email, "to:", values.password);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-lg">
      <h2 className="text-3xl font-inter font-bold text-center mb-10 text-[#06275A]">
        Reset Password
      </h2>

      {email ? (
        <p className="text-center text-gray-700 mb-6">
          Resetting password for <strong>{email}</strong>
        </p>
      ) : (
        <p className="text-red-500 text-center mb-6">
          No email provided. Please start again from Forgot Password.
        </p>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
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

            <Field name="confirmPassword">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="password"
                  label="Confirm New Password"
                  placeholder="Confirm your password"
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>

            <button
              type="submit"
              disabled={!email}
              className="w-full h-12 flex justify-center items-center bg-[#06275A] text-white rounded-lg hover:bg-[#06105a]
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold"
            >
              Submit
            </button>

            <Link
              to="/login"
              className="flex justify-center items-center space-x-1.5 font-inter text-[#06275A]"
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
