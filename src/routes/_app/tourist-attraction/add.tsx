import Input from "@/components/elements/input";
import Select, { SelectOption } from "@/components/elements/select";
import { ButtonLoader } from "@/components/loaders";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { VenueSearch } from ".";
import { MainImageSection } from "@/components/elements/MainImageSection";
import { AdditionalImagesSection } from "@/components/elements/AdditionalImagesSection";
import { useCreateTouristSiteMutation } from "@/redux/features/touristSites/touristSiteApiSlice";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_app/tourist-attraction/add")({
  validateSearch: (search) => VenueSearch.parse(search),
  component: RouteComponent,
});

const categoryOptions: SelectOption[] = [
  { label: "HISTORICAL", value: "HISTORICAL" },
  { label: "CULTURAL", value: "CULTURAL" },
  { label: "ENTERTAINMENT", value: "ENTERTAINMENT" },
  { label: "LEISURE", value: "LEISURE" },
  { label: "NATURE", value: "NATURE" },
  { label: "OTHERS", value: "OTHERS", disabled: true }, // Disabled option
];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  category: Yup.string().required("Category is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  landmark: Yup.string().required("Landmark is required"),
});

function RouteComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const [createSite, { isLoading: isCreating }] =
    useCreateTouristSiteMutation();

  const initialValues = {
    id: search?.id ?? "",
    name: search?.name ?? "",
    category: search?.category ?? "",
    address: search?.address ?? "",
    description: search?.description ?? "",
    phone: search?.phone ?? "",
    email: search?.email ?? "",
    landmark: search?.landmark ?? "",
    mainImage: search?.mainImage ?? (null as File | null),
    additionalImages: [] as File[],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted:", values);

    // build FormData object
    const formData = new FormData();

    if (search?.id) {
      formData.append("id", values.id);
    }

    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("address", values.address);
    formData.append("description", values.description);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("landmark", values.landmark);

    if (values.mainImage) {
      formData.append("image", values.mainImage);
    }
    if (values.additionalImages.length > 0) {
      formData.append("second_image", values?.additionalImages[1]);
      formData.append("third_image", values?.additionalImages[2]);
    }
    try {
      await createSite(formData).unwrap();
      toast(
        JSON.stringify({ title: "Tourist attraction added successfully!" })
      );

      await router.invalidate();

      await navigate({ to: ".." });
    } catch (error) {
      console.error("Error logging in: ", error);
      toast(JSON.stringify({ title: "Error adding tourist attraction!" }));
    }
  };

  return (
    <main className="font-inter">
      <div className="mb-5">
        <h1 className="font-medium text-2xl text-[#06275A] ">
          Add/Edit Tourist Attraction
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
            <Field name="landmark">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Landmark"
                  placeholder="Enter landmark"
                  error={
                    touched.landmark && errors.landmark
                      ? errors.landmark
                      : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>

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
                  {isCreating ? <ButtonLoader title="Saving..." /> : "Save"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
