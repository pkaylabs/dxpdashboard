import { createFileRoute, useRouter } from "@tanstack/react-router";
import { UserSearch } from ".";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { ButtonLoader } from "@/components/loaders";
import Select from "@/components/elements/select";
import Input from "@/components/elements/input";
import { ProfilePictureSection } from "../-components";

export const Route = createFileRoute("/_app/user-management/add")({
  validateSearch: (search) => UserSearch.parse(search),
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
  location: Yup.string().required("Location is required"),
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

function RouteComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: search.name ?? "",
    email: search.email ?? "",
    phone: search.phone ?? "",
    role: search.role ?? "",
    location: search.location ?? "",
    profilePicture: search.avatar ?? (null as File | null),
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted:", values);
    setIsSubmitting(true);

    try {
      // Simulate API call
      await router.invalidate();
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
    <main className="font-inter">
      <div className="mb-5">
        <h1 className="font-medium text-2xl text-[#06275A] ">Add/Edit User</h1>
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
                />
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="font-medium text-lg text-[#06275A]">
                    General Information
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Basic information about the account
                  </p>
                </div>

                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <Field name="name">
                      {({ field }: any) => (
                        <Input
                          {...field}
                          label="Full Name"
                          placeholder="Enter user full name"
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
                          placeholder="Enter user email address"
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
                          placeholder="Enter user phone number"
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
                          placeholder="Select user role"
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

                <Field name="location">
                  {({ field }: any) => (
                    <Input
                      {...field}
                      label="Location"
                      placeholder="Enter user location"
                      error={
                        touched.location && errors.location
                          ? errors.location
                          : undefined
                      }
                      required
                      fullWidth
                    />
                  )}
                </Field>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate({ to: ".." })}
                    disabled={isSubmitting}
                    className="w-48 h-12 flex justify-center items-center bg-white border border-gray-200 text-[#051f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
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
    </main>
  );
}
