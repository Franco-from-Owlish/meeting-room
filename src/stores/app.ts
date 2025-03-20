import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

export const useAppStore = defineStore("app", () => {
  const route = useRoute();
  const router = useRouter();

  // App
  const pageTitle = ref<string>("All offices");
  const hideAddButton = ref<boolean>(false);

  // Modals / Dialogs
  function showModal(queryKey: "add" | "staff", value: string = "show") {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        add: queryKey === "add" ? value : undefined,
        staff: queryKey === "staff" ? value : undefined,
      },
    });
  }

  function hideModals() {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        add: undefined,
        staff: undefined,
      },
    });
  }
  const showAddModal = computed<boolean>(() => route.query["add"] != undefined);
  const showStaffModal = computed<boolean>(() => route.query["staff"] != undefined);

  // Staff state
  const staffUpdated = ref<boolean>(false);

  return {
    // App
    pageTitle,
    hideAddButton,

    // Dialogs
    showAddModal,
    showStaffModal,
    showModal,
    hideModals,

    // State
    staffUpdated,
  };
});
