import { ButtonLoader } from "@/components/loaders";
import React from "react";
import { toast } from "react-hot-toast";

const Contact = () => {
  // Form state can be managed
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  // Form submission handler with 3s simulation and toast
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.description
    ) {
      toast(
        JSON.stringify({
          type: "error",
          title: "Please fill in all fields",
        })
      );

      return;
    }

    setIsLoading(true);

    try {
      // Simulate form submission with 3 second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Show success toast
      toast(
        JSON.stringify({
          type: "success",
          title: "Message sent successfully! We'll get back to you soon.",
        })
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        description: "",
      });
    } catch (error: unknown) {
      toast(
        JSON.stringify({
          type: "error",
          title: "Failed to send message. Please try again.",
        })
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-[80rem] mx-auto slide-up">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center justify-center">
        Contact Us
      </h1>
      <p className="text-gray-600 mb-6 flex items-center justify-center">
        We'd love to hear from you! Please fill out the form below to get in
        touch.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        {/* Subject */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="subject"
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            rows={5}
            placeholder="Your Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonLoader title="Sending..." color="white" />
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Contact;
