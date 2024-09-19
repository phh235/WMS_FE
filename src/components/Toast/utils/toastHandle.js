import Toast from "@components/Toast/toast.js";

export const showToastInfo = (message, text) => {
  Toast.fire({
    icon: "info",
    title: message,
    text: text,
  });
};

export const showToastSuccess = (message, text) => {
  Toast.fire({
    icon: "success",
    title: message,
    text: text,
  });
};

export const showToastError = (message, text) => {
  Toast.fire({
    icon: "error",
    title: message,
    text: text,
  });
};

export const showToastWarning = (message, text) => {
  Toast.fire({
    icon: "warning",
    title: message,
    text: text,
  });
};
