import { useEffect, useState } from "react";
import Input from "./input";
import { FormikErrors, FormikTouched } from "formik";

export const MainImageSection = ({
  values,
  setFieldValue,
  touched,
  errors,
}: {
  values: { mainImage: File | string | null };
  setFieldValue: (field: string, value: File | string | null) => void;
  touched: FormikTouched<{
    name: string;
    category: string;
    address: string;
    description: string;
    mainImage: File | null;
    additionalImages: File[];
  }>;
  errors: FormikErrors<{
    name: string;
    category: string;
    address: string;
    description: string;
    mainImage: File | null;
    additionalImages: File[];
  }>;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemovePicture = () => {
    setFieldValue("mainImage", null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    if (values.mainImage instanceof File) {
      setIsLoading(true);
      const url = URL.createObjectURL(values.mainImage);
      setPreviewUrl(url);

      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => {
        URL.revokeObjectURL(url);
        clearTimeout(timer);
      };
    } else {
      setPreviewUrl(null);
      setIsLoading(false);
    }
  }, [values.mainImage]);

  const handleFileChange = (file: File | null) => {
    setFieldValue("mainImage", file);
  };

  return (
    <div className="flex gap-4 lg:max-w-[70%] mt-3">
      <div className="relative">
        {previewUrl && (
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="Main Preview"
              className="w-22 h-22 rounded-full shadow"
            />
            <button
              type="button"
              onClick={() => handleFileChange(null)}
              className="absolute top-1 right-1 h-8 w-8 bg-white rounded-full p-1 shadow hover:bg-gray-100 cursor-pointer"
              title="Remove Image"
            >
              ✕
            </button>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-[#0000001f] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className="flex-1 w-full">
        <Input
          name="mainImage"
          type="file"
          label="Main Image"
          fileValue={values.mainImage instanceof File ? values.mainImage : null}
          acceptedFileTypes="image/jpeg,image/png,image/gif"
          maxFileSize={5}
          filePreview={false}
          onFileChange={(file) =>
            handleFileChange(Array.isArray(file) ? (file[0] ?? null) : file)
          }
          error={
            touched.mainImage && errors.mainImage ? errors.mainImage : undefined
          }
          helperText="Upload a main image (max 5MB)."
          fullWidth
        />
        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-3">
          {values.mainImage && (
            <button
              type="button"
              onClick={handleRemovePicture}
              className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 font-medium"
            >
              Remove picture
            </button>
          )}

          {previewUrl && (
            <span className="text-sm text-green-600 font-medium">
              ✓ New image selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
