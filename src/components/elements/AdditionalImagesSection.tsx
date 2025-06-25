import { useEffect, useState } from "react";
import Input from "./input";
import { FormikErrors, FormikTouched } from "formik";

export const AdditionalImagesSection = ({
  values,
  setFieldValue,
  touched,
  errors,
}: {
  values: { additionalImages?: File[] | null };
  setFieldValue: (field: string, value: File[] | null) => void;
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
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      Array.isArray(values.additionalImages) &&
      values.additionalImages.length
    ) {
      setIsLoading(true);
      const urls = values.additionalImages.map((file: File) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls(urls);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => {
        urls.forEach((url: string) => URL.revokeObjectURL(url));
        clearTimeout(timer);
      };
    } else {
      setPreviewUrls([]);
      setIsLoading(false);
    }
  }, [values.additionalImages]);

  const handleFilesChange = (files: File[] | null) => {
    setFieldValue("additionalImages", files);
  };

  const handleRemovePicture = () => {
    setFieldValue("additionalImages", []);
    setPreviewUrls([]);
  };

  const removeImage = (index: number) => {
    const updated = [...(values.additionalImages || [])];
    updated.splice(index, 1);
    setFieldValue("additionalImages", updated.length ? updated : null);
  };

  return (
    <div className="flex gap-4 flex-wrap lg:max-w-[70%] mt-3">
      {previewUrls.map((url, i) => (
        <div key={i} className="relative inline-block">
          <img
            src={url}
            alt={`Additional ${i + 1}`}
            className="w-22 h-22 rounded-full shadow"
          />
          <button
            type="button"
            onClick={() => removeImage(i)}
            className="absolute top-1 right-1 h-8 w-8 bg-white rounded-full p-1 shadow hover:bg-gray-100 cursor-pointer"
            title="Remove Image"
          >
            ✕
          </button>
        </div>
      ))}

      {isLoading && (
        <div className="absolute inset-0 bg-[#0000001f] rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {(values.additionalImages?.length || 0) < 3 && (
        <div className="flex-1 min-w-[200px]">
          <Input
            name="additionalImages"
            type="file"
            label={`Additional Images (${values.additionalImages?.length || 0}/3)`}
            acceptedFileTypes="image/jpeg,image/png,image/gif"
            maxFileSize={5}
            filePreview={false}
            fileValue={values.additionalImages}
            multiple
            onFileChange={(files) => handleFilesChange(files)}
            error={
              touched.additionalImages && errors.additionalImages
                ? Array.isArray(errors.additionalImages)
                  ? errors.additionalImages.join(", ")
                  : typeof errors.additionalImages === "string"
                    ? errors.additionalImages
                    : undefined
                : undefined
            }
            helperText="Upload up to 3 images (max 5MB each)."
            fullWidth
          />
          {/* Action buttons */}
          {(values.additionalImages?.length || 0) > 0 && (
            <div className="flex items-center gap-3 mt-3">
              {values.additionalImages && (
                <button
                  type="button"
                  onClick={handleRemovePicture}
                  className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200 font-medium"
                >
                  Remove picture
                </button>
              )}

              {previewUrls && (
                <span className="text-sm text-green-600 font-medium">
                  ✓ New image selected
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
