<template>
  <v-fab
    app
    class="mr-4"
    color="#0D4477"
    :icon="PlusIcon"
    @click="showAddModal"
    :height="size"
    :width="size"
    rounded="pill"
  />
</template>

<script setup lang="ts">
  import { VFab } from "vuetify/components/VFab";

  import { useAppStore } from "@/stores/app";
  import PlusIcon from "@/components/icons/PlusIcon.vue";

  const size: string = "64px";

  const appStore = useAppStore();

  function showAddModal() {
    appStore.showModal("add");
  }
</script>
