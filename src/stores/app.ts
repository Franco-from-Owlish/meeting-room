import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

export const useAppStore = defineStore("app", () => {
  const route = useRoute();
  const router = useRouter();

  // page title
  const pageTitle = ref<string>("All offices");

  // modals
  function showModal(queryKey: "add" | "staff") {
    router.push({
      path: route.path,
      query: {
        add: queryKey === "add" ? "show" : undefined,
        staff: queryKey === "staff" ? "show" : undefined,
      },
    });
  }
  const showAddModal = computed<boolean>(() => route.query["add"] === "show");
  const showStaffModal = computed<boolean>(() => route.query["staff"] === "show");

  return {
    // pageTitle
    pageTitle,

    // modals
    showAddModal,
    showStaffModal,
    showModal,
  };
});
