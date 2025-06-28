import { createFileRoute } from "@tanstack/react-router";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import { PoliticalSearch } from ".";
import { MainImageSection } from "@/components/elements/MainImageSection";
import { AdditionalImagesSection } from "@/components/elements/AdditionalImagesSection";
import { useCreatePoliticalSiteMutation } from "@/redux/features/politicalSites/politicalSitesApiSlice";
import toast from "react-hot-toast";
import Select, { SelectOption } from "@/components/elements/select";

export const Route = createFileRoute("/_app/political-sites/add")({
  validateSearch: (search) => PoliticalSearch.parse(search),
  component: RouteComponent,
});

const categoryOptions: SelectOption[] = [
  { label: "Leisure/Entertainment", value: "Leisure/Entertainment" },
  { label: "Culture/Nature", value: "OTHERS" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Sports", value: "Sports" },
  { label: "Business", value: "Business", disabled: true }, // Disabled option
];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  landmark: Yup.string().optional(),
  custodian: Yup.string().optional(),
  category: Yup.string().optional(),
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [createPoliticalSite, { isLoading: isCreating }] =
    useCreatePoliticalSiteMutation();

  const initialValues = {
    id: search?.id ?? "",
    name: search?.name ?? "",
    address: search?.address ?? "",
    description: search?.description ?? "",
    phone: search?.phone ?? "",
    email: search?.email ?? "",
    landmark: search?.landmark ?? "",
    custodian: search?.custodian ?? "",
    category: search?.category ?? "",
    mainImage: null as File | null,
    additionalImages: [] as File[],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted:", values);
    const formData = new FormData();

    if (search?.id) {
      formData.append("id", values.id);
    }

    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("description", values.description);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("landmark", values.landmark);
    formData.append("custodian", values.custodian);
    formData.append("category", values.category);
    if (values.mainImage) {
      formData.append("mainImage", values.mainImage);
    }
    if (values.additionalImages.length > 0) {
      formData.append("second_image", values.additionalImages[1]);
      formData.append("third_image", values.additionalImages[2]);
    }
    try {
      await createPoliticalSite(formData).unwrap();
      toast(
        JSON.stringify({
          type: "success",
          title: "Political site saved successfully!",
        })
      );
      await navigate({ to: ".." });
    } catch (error) {
      console.error("Error logging in: ", error);
      toast(
        JSON.stringify({
          type: "error",
          title: "Failed to save political site. Please try again.",
        })
      );
    }
  };
  const isLoggingIn = isCreating;

  return (
    <main className="font-inter">
      <div className="mb-5">
        <h1 className="font-medium text-2xl text-[#06275A] ">
          Add/Edit Political sites
        </h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-4">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <Field name="name">
                  {({ field }: import("formik").FieldProps) => (
                    <Input
                      {...field}
                      label="Name"
                      placeholder="Enter name"
                      error={
                        touched.name && errors.name ? errors.name : undefined
                      }
                      required
                      fullWidth
                    />
                  )}
                </Field>
              </div>

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
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <Field name="landmark">
                  {({ field }: import("formik").FieldProps) => (
                    <Input
                      {...field}
                      label="Landmark"
                      placeholder="Enter landmark (optional)"
                      error={
                        touched.landmark && errors.landmark
                          ? errors.landmark
                          : undefined
                      }
                      fullWidth
                    />
                  )}
                </Field>
              </div>
              <div className="flex-1">
                <Field name="custodian">
                  {({ field }: import("formik").FieldProps) => (
                    <Input
                      {...field}
                      label="Custodian"
                      placeholder="Enter custodian (optional)"
                      error={
                        touched.custodian && errors.custodian
                          ? errors.custodian
                          : undefined
                      }
                      fullWidth
                    />
                  )}
                </Field>
              </div>
            </div>
            <div>
              <div className="mt-1">
                <MainImageSection
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <AdditionalImagesSection
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
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
