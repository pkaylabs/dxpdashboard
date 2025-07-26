import { useEffect, useState } from "react";
import Input from "./input";
import { FormikErrors, FormikTouched } from "formik";

interface Props {
  values: { imageUrl: string; imageFile: File | null; [k: string]: unknown };
  setFieldValue: (f: string, v: unknown) => void;
  touched: Record<string, unknown>;
  errors: Record<string, unknown>;
}

export const MainImageSection: React.FC<Props> = ({
  values,
  setFieldValue,
  touched,
  errors,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (values.imageUrl && !values.imageFile) {
      (async () => {
        try {
          const res = await fetch(
            /^https?:\/\//.test(values.imageUrl)
              ? values.imageUrl
              : `https://api.bayelsaxp.com${values.imageUrl}`
          );
          const blob = await res.blob();
          const filename = values.imageUrl.split("/").pop() || "image.png";
          const file = new File([blob], filename, { type: blob.type });
          setFieldValue("avatarFile", file);
        } catch (err) {
          console.error("Failed to fetch existing avatar:", err);
        }
      })();
    }
  }, [values.imageUrl, values.imageFile, setFieldValue]);

  useEffect(() => {
    // If it's a File, create a blob URL; if it's already a string URL, just use that
    if (values.imageFile instanceof File) {
      const url = URL.createObjectURL(values.imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof values.imageUrl === "string" && values.imageUrl) {
      setPreviewUrl(values.imageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [values.imageFile, values.imageUrl]);

  return (
    <div className="flex gap-4 lg:max-w-[70%] mt-3">
      {previewUrl && (
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Main Preview"
            className="w-22 h-22 rounded-full shadow"
          />
          <button
            type="button"
            onClick={() => setFieldValue("imageUrl", null)}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
            title="Remove Image"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex-1">
        <Input
          name="imageFile"
          type="file"
          label="Main Image"
          acceptedFileTypes="image/jpeg,image/png,image/gif"
          maxFileSize={5}
          fileValue={values.imageFile}
          onFileChange={(files) => {
            const file = files?.[0] ?? null;
            setFieldValue("imageFile", file);
          }}
          error={
            touched.imageFile && errors.imageFile
              ? String(errors.imageFile)
              : undefined
          }
          helperText="Upload a main image (max 5 MB)."
          fullWidth
        />
      </div>
    </div>
  );
};
