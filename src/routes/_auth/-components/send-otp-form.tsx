import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "@/components/elements/input";
import { useNavigate } from "@tanstack/react-router";

interface SendOtpValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const SendOtpForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: SendOtpValues = { email: "" };

  const handleSubmit = async (values: SendOtpValues) => {

    console.log("Sending OTP to:", values.email);

    // On success, navigate to “Verify OTP” and pass the email as a search param:
    navigate({
      to: "/verify-otp",
      search: (old) => ({ ...(old ?? {}), email: values.email }),
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#06275A]">
        Forgot Password
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <Field name="email">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="email"
                  label="Email Address"
                  placeholder="jamal@gmail.com"
                  error={touched.email && errors.email ? errors.email : undefined}
                  required
                  fullWidth
                />
              )}
            </Field>

            <button
              type="submit"
              className="w-full h-12 flex justify-center items-center bg-[#06275A] text-white rounded-lg hover:bg-[#06105a]
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold"
            >
              Send OTP
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendOtpForm;
