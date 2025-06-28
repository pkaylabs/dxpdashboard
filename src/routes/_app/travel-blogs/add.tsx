import { createFileRoute } from "@tanstack/react-router";
import { TravelSearch } from ".";
import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import Input from "@/components/elements/input";
import { ButtonLoader } from "@/components/loaders";
import { MainImageSection } from "@/components/elements/MainImageSection";
import { useCreateTravelBlogMutation } from "@/redux/features/travelBlogs/travelBlogsApiSlice";
import Select, { SelectOption } from "@/components/elements/select";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_app/travel-blogs/add")({
  validateSearch: (search) => TravelSearch.parse(search),
  component: RouteComponent,
});

const categoryOptions: SelectOption[] = [
  { label: "TRAVEL", value: "TRAVEL BLOG" },
  { label: "FUNFACT", value: "FUN FACT" },
  { label: "OTHER", value: "OTHER BLOG" }, // Disabled option
];

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  content: Yup.string().required("Writer is required"),
  category: Yup.string().required("Category is required"),
  mainImage: Yup.mixed().required("Feature image is required"),
  is_published: Yup.boolean().required("Publication status is required"),
  description: Yup.string().required("Description is required"),
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [createBlog, { isLoading: creating }] = useCreateTravelBlogMutation();

  const initialValues = {
    id: search?.id ?? "",
    title: search?.title ?? "",
    content: search?.content ?? "",
    description: search?.description ?? "",
    category: search?.category ?? "",
    is_published: search?.is_published ?? false,
    mainImage: null as File | null,
    // additionalImages: [] as File[],
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();

    if (search?.id) {
      formData.append("id", values.id);
    }

    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("is_published", String(values.is_published));
    if (values.mainImage) {
      formData.append("feature_image", values.mainImage);
    }

    try {
      await createBlog(formData).unwrap();

      toast(
        JSON.stringify({ type: "success", title: "Blog saved successfully!" })
      );
      // await router.invalidate();
      await navigate({ to: ".." });
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const isLoggingIn = creating;

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
        {({ errors, touched, setFieldValue, handleChange, values }) => (
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

            <Field name="content">
              {({ field }: import("formik").FieldProps) => (
                <Input
                  {...field}
                  label="Content"
                  placeholder="Enter content"
                  error={
                    touched.content && errors.content
                      ? errors.content
                      : undefined
                  }
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
            <div>
              <label className="inline-flex items-center">
                <Field
                  type="checkbox"
                  onChange={handleChange}
                  name="is_published"
                  className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Publish this blog
                </span>
              </label>
              {touched.is_published && errors.is_published && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.is_published}
                </p>
              )}
            </div>

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
                value={values.description}
                onChange={handleChange}
                className="mt-1 h-32 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 bg-white"
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
