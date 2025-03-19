import { createApp } from "vue";

import App from "@/App.vue";
import vuetify from "@/modules/vuetify/index";
import router from "@/router";
import pinia from "@/stores";

const app = createApp(App);

// Register plugins
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
