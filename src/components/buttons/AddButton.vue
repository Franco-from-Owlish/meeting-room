<template>
  <v-fab
    app
    class="mr-4"
    color="#0D4477"
    :icon="mdiPlus"
    @click="showAddModal"
    :height="size"
    :width="size"
  />
</template>

<script setup lang="ts">
  import { VFab } from "vuetify/components/VFab";
  import { mdiPlus } from "@mdi/js";

  import { useAppStore } from "@/stores/app";

  const size: string = "64px";

  const appStore = useAppStore();

  function showAddModal() {
    appStore.showModal("add");
  }
</script>
