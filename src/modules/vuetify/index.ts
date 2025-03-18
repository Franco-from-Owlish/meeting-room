import "@/assets/style/main.scss";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

import lightTheme from "./lightTheme";

const vuetify = createVuetify({
  defaults: {
    global: {
      rounded: "lg",
    },
    VBtn: {
      color: "primary",
      rounded: "pill",
    },
    VCardTitle: {
      class: "text-wrap",
    },
    VList: {
      "bg-color": "#0000",
    },
    VListItem: {
      "bg-color": "transparent",
    },
    VTextField: {
      variant: "outlined",
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme,
    },
  },
});

export default vuetify;
