import "@assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/authStore";
import App from "./App.vue";
import router from "./router";
import i18n from "./lang/i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n);

const authStore = useAuthStore();
authStore.checkAuth();

app.mount("#app");
