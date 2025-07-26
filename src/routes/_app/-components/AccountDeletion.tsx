import React, { useState } from "react";

interface DeletionRequest {
  type: "all_data" | "partial_data" | "whole_account";
  details: string;
}

interface AccountDeletionRequestPageProps {
  logoUrl: string;
  appName: string;
  onSubmit: (request: DeletionRequest) => void;
}

const deletionOptions = [
  { label: "All Data", value: "all_data" },
  { label: "Partial Data", value: "partial_data" },
  { label: "Whole Account", value: "whole_account" },
];

const AccountDeletionRequestPage: React.FC<AccountDeletionRequestPageProps> = ({
  appName,
  onSubmit,
}) => {
  const [requestType, setRequestType] =
    useState<DeletionRequest["type"]>("all_data");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestType) {
      setError("Please select a deletion type.");
      return;
    }
    onSubmit({ type: requestType, details });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Logo & App Name */}
      <div className="flex items-center justify-center mb-6">
        <img
          src={"/frame.png"}
          alt={`${appName} logo`}
          className="h-12 w-auto mr-3"
        />
        <span className="text-2xl font-bold text-gray-800">{appName}</span>
      </div>
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Request Account Deletion
      </h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="mb-4">
          <legend className="text-lg font-medium text-gray-700 mb-2">
            What would you like to delete?
          </legend>
          <div className="space-y-2">
            {deletionOptions.map(({ label, value }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="deletionType"
                  value={value}
                  checked={requestType === value}
                  onChange={() => {
                    setRequestType(value as DeletionRequest["type"]);
                    setError("");
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-gray-700 font-medium mb-2"
          >
            Tell us more (optional)
          </label>
          <textarea
            id="details"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Any additional information about your request..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {error && <p className="text-blue-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-48 h-12 flex justify-center items-center bg-[#06275A] text-white cursor-pointer rounded-md hover:bg-[#06105a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 font-semibold "
        >
          Request Deletion
        </button>
      </form>
    </div>
  );
};

export default AccountDeletionRequestPage;
