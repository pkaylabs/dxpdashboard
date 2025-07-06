import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import { createFileRoute } from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ProfilePictureSection } from "../../-components";
import { useAppSelector } from "@/redux";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/users/usersApiSlice";
import toast from "react-hot-toast";

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
  avatar: Yup.mixed<File | string>().test(
    "fileType",
    "Unsupported file type",
    (value) => {
      if (!value || typeof value === "string") return true;
      return ["image/jpeg", "image/png"].includes(value.type);
    }
  ),
  // role: Yup.string().required("Role is required"),
  // profilePicture: Yup.mixed()
  //   .test("fileSize", "File too large", (value: any) => {
  //     if (!value) return true;
  //     return value.size <= 5 * 1024 * 1024;
  //   })
  //   .test("fileType", "Unsupported file type", (value: any) => {
  //     if (!value) return true;
  //     return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  //   }),
});

function RouteComponent() {
  const user = useAppSelector((state) => state.auth.user);

  const { data, refetch } = useGetUserProfileQuery(undefined);
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const initialValues = {
    name: data?.name ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
    avatar: data?.avatar ?? null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (values.avatar instanceof File) {
      formData.append("avatar", values.avatar);
    } else if (typeof values.avatar === "string") {
      formData.append("avatar", values.avatar);
    }
    try {
      await updateProfile(formData).unwrap();
      refetch();
      toast(
        JSON.stringify({
          type: "success",
          title: "User profile updated successfully",
        })
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      toast(
        JSON.stringify({
          type: "error",
          title: "Failed to update profile",
        })
      );
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
                  user={user}
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
                      {({ field }: import("formik").FieldProps) => (
                        <Input
                          {...field}
                          type="name"
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
                      {({ field }: import("formik").FieldProps) => (
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
                      {({ field }: import("formik").FieldProps) => (
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
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={updating}
                    className="w-48 h-12 flex justify-center cursor-pointer items-center bg-[#06275A] text-white rounded-md hover:bg-[#051f4a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
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
