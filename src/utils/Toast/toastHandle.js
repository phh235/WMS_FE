import Toast from "@/utils/Toast/toast";
import Swal from "sweetalert2";

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

export const showToastLoading = (message, timer) => {
  Toast.fire({
    icon: "info",
    title: message,
    timer: timer,
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: (toast) => {
      Swal.showLoading();
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

export const closeToastLoading = () => {
  Swal.close();
};
