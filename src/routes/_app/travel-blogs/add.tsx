import {
  createFileRoute,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { TravelSearch } from ".";
import * as Yup from "yup";
import { useState } from "react";
import { sleep } from "@/utils";
import { Field, Form, Formik } from "formik";
import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import { MainImageSection } from "@/components/elements/MainImageSection";
import { AdditionalImagesSection } from "@/components/elements/AdditionalImagesSection";

export const Route = createFileRoute("/_app/travel-blogs/add")({
  validateSearch: (search) => TravelSearch.parse(search),
  component: RouteComponent,
});

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  writer: Yup.string().required("Writer is required"),
  description: Yup.string().required("Description is required"),
});

function RouteComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  const initialValues = {
    title: search?.title ?? "",
    writer: search?.writer ?? "",
    description: search?.description ?? "",
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
          Add/Edit Travel Blog
        </h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-4">
            <Field name="title">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Title"
                  placeholder="Enter title"
                  error={
                    touched.title && errors.title ? errors.title : undefined
                  }
                  required
                  fullWidth
                />
              )}
            </Field>

            <Field name="writer">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Writer"
                  placeholder="Enter writer"
                  error={
                    touched.writer && errors.writer ? errors.writer : undefined
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
