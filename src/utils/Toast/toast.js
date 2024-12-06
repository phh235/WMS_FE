import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
    timerProgressBar: "colored-timer-progress-bar",
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
    toast.onclick = Swal.close;
  },
});

export default Toast;
