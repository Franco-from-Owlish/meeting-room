import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/DefaultLayout.vue"),
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
      component: () => import("@/layouts/DetailLayout.vue"),
      children: [
        {
          name: "OfficeNew",
          path: "new",
          component: () => import("@/views/office/OfficeNewView.vue"),
        },
        {
          name: "OfficeDetail",
          path: "detail/id",
          component: () => import("@/views/office/OfficeDetailView.vue"),
        },
      ],
    },
  ],
});

export default router;
