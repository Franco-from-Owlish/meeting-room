import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          redirect: "home",
        },
        {
          name: "Home",
          path: "home",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    },
    {
      path: "/office",
      component: DefaultLayout,
      children: [
        {
          name: "OfficeNew",
          path: "new",
          component: () => import("@/views/HomeView.vue"),
        },
      ],
    },
  ],
});

export default router;
