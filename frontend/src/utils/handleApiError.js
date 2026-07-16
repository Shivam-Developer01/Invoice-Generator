import { toast } from "react-toastify";

const handleApiError = (error) => {
  const response = error.response?.data;

  // Validation Errors
  if (response?.errors?.length) {
    const messages = [...new Set(response.errors.map((err) => err.msg))];

    messages.forEach((message) => {
      toast.error(message);
    });

    return;
  }

  // Backend message
  if (response?.message) {
    toast.error(response.message);
    return;
  }

  // Network error
  if (error.code === "ERR_NETWORK") {
    toast.error("Unable to connect to the server.");
    return;
  }

  // Fallback
  toast.error("Something went wrong. Please try again.");

  // General Error
  toast.error(response?.message || "Something went wrong. Please try again.");
};

export default handleApiError;
