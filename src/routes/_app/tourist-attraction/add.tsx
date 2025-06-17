import Input from "@/components/elements/input";
import Select, { SelectOption } from "@/components/elements/select";
import { ButtonLoader } from "@/components/loaders";
import { sleep } from "@/utils";
import {
  createFileRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { VenueSearch } from ".";

export const Route = createFileRoute("/_app/tourist-attraction/add")({
  validateSearch: (search) => VenueSearch.parse(search),
  component: RouteComponent,
});

const categoryOptions: SelectOption[] = [
  { label: "Leisure/Entertainment", value: "Leisure/Entertainment" },
  { label: "Culture/Nature", value: "Culture/Nature" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Sports", value: "Sports" },
  { label: "Business", value: "Business", disabled: true }, // Disabled option
];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  category: Yup.string().required("Category is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
});

function RouteComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  const initialValues = {
    name: search?.name ?? "",
    category: search?.category ?? "",
    address: search?.address ?? "",
    description: "",
    mainImage: null as File | null,
    additionalImages: [] as File[],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Form submitted:", values);

    setIsSubmitting(true);
    try {
      await router.invalidate();

      await sleep(1);

      await navigate({ to: ".." });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const isLoggingIn = isLoading || isSubmitting;

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
                  {({ field }: any) => (
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
                  {({ field }: any) => (
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

            <Field name="address">
              {({ field }: any) => (
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
              <label
                htmlFor="mainImage"
                className="block text-sm font-medium text-gray-700"
              >
                Main Image
              </label>
              <div className="mt-1">
                {values.mainImage ? (
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(values.mainImage)}
                      alt="Main Preview"
                      className="w-22 h-22 rounded-full shadow"
                    />
                    <button
                      type="button"
                      onClick={() => setFieldValue("mainImage", null)}
                      className="absolute top-1 h-8 w-8 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                      title="Change Image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      setFieldValue("mainImage", file);
                    }}
                    className="block w-full text-sm text-gray-700"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Images (up to 3)
              </label>
              <div className="mt-1">
                {values.additionalImages.length < 3 && (
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.currentTarget.files ?? []);
                      const selected = files.slice(0, 3);
                      setFieldValue("additionalImages", selected);
                    }}
                    className="block w-full text-sm text-gray-700"
                  />
                )}

                {values.additionalImages.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {values.additionalImages.map((file, idx) => (
                      <div key={idx} className="relative inline-block">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Additional ${idx + 1}`}
                          className="w-22 h-22 object-cover rounded-full shadow"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newList = values.additionalImages.filter(
                              (_, i) => i !== idx
                            );
                            setFieldValue("additionalImages", newList);
                          }}
                          className="absolute top-1 right-1 w-8 h-8 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                          title="Remove Image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
