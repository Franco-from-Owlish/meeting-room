import { createApp } from "vue";

import App from "@/App.vue";
import pinia from "@/stores";
import router from "@/router";
import vuetify from "@/modules/vuetify";

const app = createApp(App);

// Register plugins
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
