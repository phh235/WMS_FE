import "@assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/authStore";
import App from "./App.vue";
import router from "./router";
// Vue i18n
import i18n from "./lang/i18n";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
// Vue datepicker
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const app = createApp(App);
const pinia = createPinia();

NProgress.configure({
  showSpinner: false, // Ẩn biểu tượng loading tròn
  speed: 500, // Tốc độ chạy (ms)
  minimum: 0.1, // Giá trị nhỏ nhất khi bắt đầu
});

app.use(router);
app.use(pinia);
app.use(i18n);
app.component("VueDatePicker", VueDatePicker);

const authStore = useAuthStore();
authStore.checkAuth();

app.mount("#app");
