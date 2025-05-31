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

export const Route = createFileRoute("/_app/travel-blogs/add")({
  validateSearch: (search) => TravelSearch.parse(search),
  component: RouteComponent,
});

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  writer: Yup.string().required("Writer is required"),
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
              {({ field }: any) => (
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
              {({ field }: any) => (
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
