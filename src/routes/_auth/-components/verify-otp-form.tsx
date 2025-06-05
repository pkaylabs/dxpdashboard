import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/elements/input";
import { useSearch, useNavigate } from "@tanstack/react-router";


interface VerifyOtpValues {
  otp: string;
}

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

const VerifyOtpForm: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_auth/verify-otp" });
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Extract the email from the URL search params:
    if (search.email) {
      setEmail(search.email);
    }
  }, [search.email]);

  const initialValues: VerifyOtpValues = { otp: "" };

  const handleSubmit = async (values: VerifyOtpValues) => {
    if (!email) {
      console.error("No email found in search params.");
      return;
    }

    console.log("Verifying OTP", values.otp, "for email", email);

    // If verification succeeds, navigate to the Reset Password screen:
    navigate({
      to: "/reset-password",
      search: { email },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#06275A]">
        Verify OTP
      </h2>

      {email ? (
        <p className="text-center mb-4 text-gray-700">
          We sent a 6‐digit code to <strong>{email}</strong>. Enter it below:
        </p>
      ) : (
        <p className="text-red-500 text-center mb-4">
          No email provided. Please go back and enter your email.
        </p>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <Field name="otp">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="text"
                  label="OTP Code"
                  placeholder="123456"
                  error={touched.otp && errors.otp ? errors.otp : undefined}
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
              Verify OTP
            </button>
          </Form>
        )}
      </Formik>

     
      <button
        onClick={() => navigate({ to: "/forgot-password" })}
        className="mt-4 text-sm text-[#06275A] hover:underline"
      >
        ← Change Email
      </button>
    </div>
  );
};

export default VerifyOtpForm;
