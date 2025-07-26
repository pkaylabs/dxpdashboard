import React, { useEffect, useState } from "react";
import Input from "./input";
import Avatar from "@/components/core/avatar";

interface Props {
  /** existing URLs for slot1 and slot2 */
  imageUrls: [string | null, string | null];
  /** newly-picked Files for slot1 and slot2 */
  imageFiles: [File | null, File | null];
  /** Formik setter */
  setFieldValue: (field: string, value: File | null) => void;
  /** Formik touched/errors keyed by imageFiles */
  touched: Record<string, any>;
  errors: Record<string, any>;
}

/**
 * A component to handle two images with preview, remove, and initial URL fetch.
 * Expects Formik values with:
 *   imageUrls: [url1, url2]
 *   imageFiles: [file1, file2]
 */
export const MultiImageSection: React.FC<Props> = ({
  imageUrls,
  imageFiles,
  setFieldValue,
  touched,
  errors,
}) => {
  const [previews, setPreviews] = useState<[string | null, string | null]>([null, null]);

  // If existing URL but no File, fetch and convert to File
  useEffect(() => {
    imageUrls.forEach((url, idx) => {
      if (url && !imageFiles[idx]) {
        (async () => {
          try {
            const fetchUrl = /^https?:\/\//.test(url)
              ? url
              : `https://api.bayelsaxp.com${url}`;
            const res = await fetch(fetchUrl);
            const blob = await res.blob();
            const name = url.split("/").pop() || `image${idx + 1}.png`;
            const file = new File([blob], name, { type: blob.type });
            setFieldValue(`imageFiles.${idx}`, file);
          } catch (e) {
            console.error("Failed to fetch image:", e);
          }
        })();
      }
    });
  }, [imageUrls, imageFiles, setFieldValue]);

  // Generate previews for any File
  useEffect(() => {
    const urls: [string | null, string | null] = [null, null];
    imageFiles.forEach((file, idx) => {
      if (file instanceof File) urls[idx] = URL.createObjectURL(file);
    });
    setPreviews(urls);
    return () => {
      urls.forEach((u) => u && URL.revokeObjectURL(u));
    };
  }, [imageFiles]);

  return (
    <div className="space-y-6">
      {[0, 1].map((idx) => {
        const preview = previews[idx];
        const url = imageUrls[idx];
        const field = `imageFiles.${idx}`;
        const touchedField = touched.imageFiles?.[idx];
        const errorField = errors.imageFiles?.[idx];
        const label = `Image ${idx + 1}`;

        // Decide Avatar src
        let src: string | undefined;
        if (preview) src = preview;
        else if (url) src = /^https?:\/\//.test(url) ? url : `https://api.bayelsaxp.com${url}`;

        return (
          <div key={idx} className="flex gap-4 items-start">
            <Avatar src={src} alt={label} size="lg" />
            <div className="flex-1">
              <Input
                name={field}
                type="file"
                label={label}
                acceptedFileTypes="image/jpeg,image/png,image/gif"
                maxFileSize={5}
                fileValue={imageFiles[idx] ?? null}
                onFileChange={(files) => {
                  const file = Array.isArray(files) ? files[0] ?? null : files;
                  setFieldValue(field, file as File | null);
                }}
                error={touchedField && errorField ? String(errorField) : undefined}
                helperText="Max 5 MB"
                fullWidth
              />
              {imageFiles[idx] && (
                <button
                  type="button"
                  onClick={() => setFieldValue(field, null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
