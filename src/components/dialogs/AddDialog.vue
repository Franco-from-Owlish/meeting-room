<template>
  <v-dialog v-model="show">
    <v-card class="py-4 px-2">
      <template #title>
        <span class="font-weight-bold"> What would you like to add? </span>
      </template>

      <v-btn
        :to="newOffice"
        block
        class="mb-4"
        color="primary"
      >
        Add office
      </v-btn>
      <v-btn
        @click="newStaff()"
        block
        color="primary"
      >
        Add staff member
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { VCard } from "vuetify/components/VCard";
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
