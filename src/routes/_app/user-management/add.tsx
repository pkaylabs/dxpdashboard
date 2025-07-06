import { createFileRoute } from "@tanstack/react-router";
import { UserSearch } from ".";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ButtonLoader } from "@/components/loaders";
// import Select from "@/components/elements/select";
import Input from "@/components/elements/input";
import { ProfilePictureSection } from "../-components";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/redux/features/users/usersApiSlice";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_app/user-management/add")({
  validateSearch: (search) => UserSearch.parse(search),
  component: RouteComponent,
});

const validationSchema = Yup.object({
  id: Yup.string(),
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .min(10, "Phone must be at least 10 characters")
    .required("Phone is required"),
  // role: Yup.string().required("Role is required"),
  bio: Yup.string().required("Bio is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    // only require a password on “create” (no search.id)
    .when("id", {
      is: (id: string) => !id,
      then: (schema) => schema.required("Password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  address: Yup.string().required("Location is required"),
  avatarUrl: Yup.string().url().notRequired(),
  avatarFile: Yup.mixed()
    .test(
      "fileType",
      "Unsupported file type",
      (f) =>
        !f ||
        (f instanceof File &&
          ["image/jpeg", "image/png", "image/gif"].includes(f.type))
    )
    .test(
      "fileSize",
      "File too large",
      (f) => !f || (f instanceof File && f.size <= 5 * 1024 * 1024)
    ),
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [addUser, { isLoading: adding }] = useCreateUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();


  const initialValues = {
    id: search?.id ?? "",
    name: search?.name ?? "",
    email: search?.email ?? "",
    phone: search?.phone ?? "",
    bio: search?.bio ?? "",
    password: "" as string,
    address: search.address ?? "",
    avatarUrl: search.avatar ?? "",
    avatarFile: null as File | null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    formData.append("bio", values.bio);
    if (values.avatarFile) {
      formData.append("avatar", values.avatarFile);
    } else {
      // Otherwise send the URL so the backend keeps it
      formData.append("avatar", values.avatarUrl);
    }
    if (!search.id && values.password) {
      formData.append("password", values.password);
    }
    if (values.id) {
      formData.append("id", values.id);
      try {
        await updateUser(formData).unwrap();
         navigate({to: ".."})
        toast(
          JSON.stringify({
            type: "success",
            title: "User updated successfully",
          })
        );
       
      } catch (error) {
        console.log(error);
        toast(
          JSON.stringify({
            type: "error",
            title: "Failed to update user",
          })
        );
      }
    } else {
      try {
        await addUser(formData).unwrap();
         navigate({to: ".."})
        toast(
          JSON.stringify({
            type: "success",
            title: "User created successfully",
          })
        );
       
      } catch (error) {
        console.log(error);
        toast(
          JSON.stringify({
            type: "error",
            title: "Failed to add user",
          })
        );
      }
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
            <Form className="space-y-6" autoComplete="off">
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
                      {({ field }: import("formik").FieldProps) => (
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
                      {({ field }: import("formik").FieldProps) => (
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
                      {({ field }: import("formik").FieldProps) => (
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
                    <Field name="password">
                      {({ field }: import("formik").FieldProps) => (
                        <Input
                          {...field}
                          type="password"
                          label="Password"
                          name="password"
                          placeholder="Enter your password"
                          error={
                            touched.password && errors.password
                              ? errors.password
                              : undefined
                          }
                          required
                          fullWidth
                        />
                      )}
                    </Field>
                  </div>

                  {/* <div className="flex-1">
                    <Field name="role">
                      {({ field }: import("formik").FieldProps) => (
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
                  </div> */}
                </div>

                <Field name="address">
                  {({ field }: import("formik").FieldProps) => (
                    <Input
                      {...field}
                      label="Address"
                      placeholder="Enter user address"
                      error={
                        touched.address && errors.address
                          ? errors.address
                          : undefined
                      }
                      required
                      fullWidth
                    />
                  )}
                </Field>
                <Field name="bio">
                  {({ field }: import("formik").FieldProps) => (
                    <Input
                      {...field}
                      label="Bio"
                      placeholder="Enter your bio"
                      error={touched.bio && errors.bio ? errors.bio : undefined}
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
                    className="w-48 h-12 flex justify-center items-center bg-white border border-gray-200 text-[#051f4a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={adding || updating}
                    className="w-48 h-12 flex justify-center items-center bg-[#06275A] text-white rounded-md hover:bg-[#051f4a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {adding ? (
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
