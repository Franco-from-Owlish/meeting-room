<template>
  <v-dialog v-model="show">
    <v-btn
      :to="newOffice"
      block
    >
      Add office
    </v-btn>
    <v-btn
      @click="newStaff()"
      block
    >
      Add staff member
    </v-btn>
  </v-dialog>
</template>

<script setup lang="ts">
  import { VDialog } from "vuetify/components/VDialog";
  import { VBtn } from "vuetify/components/VBtn";
  import { useAppStore } from "@/stores/app";
  import { computed } from "vue";
  import type { RouteLocationRaw } from "vue-router";

  const appStore = useAppStore();

  const show = computed<boolean>({
    get: () => appStore.showAddModal,
    set: (value: boolean) => {
      if (value) {
        appStore.showModal("add");
      } else {
        appStore.hideModals();
      }
    },
  });

  const newOffice: RouteLocationRaw = {
    name: "OfficeNew",
  };
  function newStaff() {
    appStore.showModal("staff");
  }
</script>
