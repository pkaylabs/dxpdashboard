import Avatar from "@/components/core/avatar";
import Input from "@/components/elements/input";
import Select from "@/components/elements/select";
import { ButtonLoader } from "@/components/loaders";
import { useAuth } from "@/services/auth";
import { createFileRoute } from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";

export const Route = createFileRoute("/_app/settings/_settings/profile")({
  component: RouteComponent,
});

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Phone must be at least 10 characters")
    .required("Phone is required"),
  role: Yup.string().required("Role is required"),
  profilePicture: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file type", (value: any) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    }),
});

const ProfilePictureSection = ({
  values,
  setFieldValue,
  touched,
  errors,
  auth,
}: {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  touched: any;
  errors: any;
  auth: any;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (values.profilePicture instanceof File) {
      setIsLoading(true);
      const url = URL.createObjectURL(values.profilePicture);
      setPreviewUrl(url);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => {
        URL.revokeObjectURL(url);
        clearTimeout(timer);
      };
    } else {
      setPreviewUrl(null);
      setIsLoading(false);
    }
  }, [values.profilePicture]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setIsLoading(true);
    }
    setFieldValue("profilePicture", file);
  };

  const handleRemovePicture = () => {
    setFieldValue("profilePicture", null);
    setPreviewUrl(null);
  };

  const getAvatarSrc = () => {
    if (isLoading) return null;
    if (previewUrl) return previewUrl;
    if (typeof values.profilePicture === "string") return values.profilePicture;
    // if (auth.user?.avatar) return auth.user.avatar;
    return null;
  };

  return (
    <div className="flex gap-4 lg:max-w-[70%] mt-3">
      <div className="relative size-20">
        <Avatar src={getAvatarSrc()} alt={auth.user ?? "NA"} size="lg" />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#0000001f] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Change indicator */}
        {previewUrl && !isLoading && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Upload status indicator */}
        {values.profilePicture && (
          <div className="absolute -top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-2 h-2 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1">
        <Input
          name="profilePicture"
          type="file"
          label="Profile Picture"
          acceptedFileTypes="image/jpeg,image/png,image/gif"
          maxFileSize={5}
          filePreview
          onFileChange={handleFileChange}
          error={
            touched.profilePicture && errors.profilePicture
              ? errors.profilePicture
              : undefined
          }
          helperText="Upload a profile picture (max 5MB). Preview will appear in the avatar."
          fullWidth
        />

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-3">
          {values.profilePicture && (
            <button
              type="button"
              onClick={handleRemovePicture}
              className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 font-medium"
            >
              Remove picture
            </button>
          )}

          {previewUrl && (
            <span className="text-sm text-green-600 font-medium">
              ✓ New image selected
            </span>
          )}
        </div>

        {/* Image info */}
        {values.profilePicture instanceof File && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <div className="text-xs text-blue-800">
              <div className="font-medium">{values.profilePicture.name}</div>
              <div className="text-blue-600">
                {(values.profilePicture.size / 1024 / 1024).toFixed(2)} MB •{" "}
                {values.profilePicture.type}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function RouteComponent() {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: auth.user || "",
    email: "",
    phone: "",
    role: "",
    profilePicture: null as File | null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted:", values);
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (values.profilePicture instanceof File) {
        console.log("New profile picture to upload:", values.profilePicture);
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="font-inter w-full">
      <div className="mb-6">
        <h2 className="font-medium text-xl text-[#06275A]">Profile Settings</h2>
        <p className="text-gray-600 text-sm mt-1">
          Update your profile information and avatar
        </p>
      </div>

      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="pb-6 border-b border-gray-200">
                <ProfilePictureSection
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  auth={auth}
                />
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="font-medium text-lg text-[#06275A]">
                    General Information
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Basic information about your account
                  </p>
                </div>

                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <Field name="name">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          label="Full Name"
                          placeholder="Enter your full name"
                          error={
                            touched.name && errors.name
                              ? errors.name
                              : undefined
                          }
                          required
                          fullWidth
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex-1">
                    <Field name="email">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          type="email"
                          label="Email Address"
                          placeholder="Enter your email address"
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
                </div>

                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <Field name="phone">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          label="Phone Number"
                          placeholder="Enter your phone number"
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

                  <div className="flex-1">
                    <Field name="role">
                      {({ field }: any) => (
                        <Select
                          {...field}
                          label="Role"
                          name="role"
                          placeholder="Select your role"
                          options={[
                            { label: "Administrator", value: "admin" },
                            { label: "Super User", value: "super" },
                            { label: "Regular User", value: "user" },
                            { label: "Guest User", value: "guest" },
                          ]}
                          value={values.role}
                          onChange={(value, option) => {
                            setFieldValue("role", value);
                            console.log("Role selected:", option);
                          }}
                          error={
                            touched.role && errors.role
                              ? errors.role
                              : undefined
                          }
                          required
                          clearable
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-48 h-12 flex justify-center items-center bg-[#06275A] text-white rounded-md hover:bg-[#051f4a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
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
