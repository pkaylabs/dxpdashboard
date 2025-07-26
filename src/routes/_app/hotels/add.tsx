import { createFileRoute } from "@tanstack/react-router";
import { HotelSearch } from ".";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import {
  MultiImageSection,
} from "@/components/elements/AdditionalImagesSection";
import Select, { SelectOption } from "@/components/elements/select";
import { useAddHotelMutation } from "@/redux/features/hotels/hotelApiSlice";
import toast from "react-hot-toast";
import { ProfilePictureSection } from "../-components";

export const Route = createFileRoute("/_app/hotels/add")({
  validateSearch: (search) => HotelSearch.parse(search),
  component: RouteComponent,
});

const categoryOptions: SelectOption[] = [
  { label: "STANDARD", value: "Standard" },
  { label: "SHORTSTAY", value: "Short Stay" },
  { label: "FAMILY", value: "Family" },
  { label: "BOOTIQUE", value: "Bootique" }, // Disabled option
];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  category: Yup.string()
    .min(3, "Category must be at least 3 characters")
    .required("Category is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  description: Yup.string().required("Description is required"),
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
  second_image_url: Yup.string().url().notRequired(),
  second_image_file: Yup.mixed()
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
  third_image_url: Yup.string().url().notRequired(),
  third_image_file: Yup.mixed()
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
  const [addHotel, { isLoading: isAdding }] = useAddHotelMutation();

  const initialValues = {
    id: search?.id ?? "",
    name: search?.name ?? "",
    address: search?.address ?? "",
    phone: search?.phone ?? "",
    email: search?.email ?? "",
    website: search?.website ?? "",
    category: search?.category ?? "",
    description: search?.description ?? "",
    avatarUrl: search?.image ?? "",
    avatarFile: null as File | null,
    imageUrls: [search?.second_image ?? null, search?.third_image ?? null] as [
      string | null,
      string | null,
    ],
    imageFiles: [null, null] as [File | null, File | null],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();

    if (search?.id) {
      formData.append("id", String(values.id));
    }
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("website", values.website);
    formData.append("category", values.category);
    formData.append("description", values.description);
    if (values.avatarFile) {
      formData.append("image", values.avatarFile);
    } else if (values.avatarUrl) {
      formData.append("image", values.avatarUrl);
    }
    values.imageFiles.forEach((file, i) => {
      if (file) {
        const key = i === 0 ? "second_image" : "third_image";
        formData.append(key, file);
      }
    });
    try {
      await addHotel(formData).unwrap();
      toast(
        JSON.stringify({
          title: "Hotel added successfully",
          type: "success",
        })
      );

      await navigate({ to: ".." });
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };
  const isLoggingIn = isAdding;

  return (
    <main className="font-inter">
      <div className="mb-5">
        <h1 className="font-medium text-2xl text-[#06275A] ">Add/Edit Hotel</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-4">
            <Field name="name">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Name"
                  placeholder="Enter name"
                  error={touched.name && errors.name ? errors.name : undefined}
                  required
                  fullWidth
                />
              )}
            </Field>

            <div className="flex-1">
              <Field name="category">
                {({ field }: import("formik").FieldProps) => (
                  <Select
                    {...field}
                    label="Category"
                    name="category"
                    placeholder="Select category"
                    options={categoryOptions}
                    value={values.category}
                    onChange={(value, option) => {
                      setFieldValue("category", value);
                      console.log("Formik category:", option);
                    }}
                    error={
                      touched.category && errors.category
                        ? errors.category
                        : undefined
                    }
                    required
                  />
                )}
              </Field>
            </div>

            <Field name="email">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Enter email"
                  type="email"
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>
            <Field name="phone">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Phone"
                  placeholder="Enter phone number"
                  type="tel"
                  error={
                    touched.phone && errors.phone ? errors.phone : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>
            <Field name="website">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Website"
                  placeholder="Enter website URL"
                  type="url"
                  error={
                    touched.website && errors.website
                      ? errors.website
                      : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>

            <Field name="address">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Address"
                  placeholder="Enter address"
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

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={values.description}
                onChange={(e) => setFieldValue("description", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 bg-white"
              />
              {touched.description && errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <div className="mt-1">
                <ProfilePictureSection
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <MultiImageSection
                  imageUrls={values.imageUrls}
                  imageFiles={values.imageFiles}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate({ to: ".." })}
                  type="button"
                  className="w-48 h-12 flex justify-center items-center bg-white cursor-pointer text-[#06275A] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-48 h-12 flex justify-center items-center bg-[#06275A] text-white cursor-pointer rounded-md hover:bg-[#06105a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold "
                >
                  {isLoggingIn ? <ButtonLoader title="Saving..." /> : "Save"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
