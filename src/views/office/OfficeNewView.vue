<template>
  <div>
    <v-form class="mt-4">
      <v-text-field
        v-model="data.name"
        placeholder="Office Name"
        label="Office Name"
      />
      <v-text-field
        v-model="data.address"
        placeholder="Physical Address"
        label="Physical Address"
      />
      <v-text-field
        v-model="data.emailAddress"
        placeholder="Email address"
        label="Email Address"
      />
      <v-text-field
        v-model="data.phone"
        placeholder="Phone Number"
        label="Phone Number"
      />
      <v-text-field
        v-model="data.capacity"
        placeholder="Maximum capacity"
        label="Maximum capacity"
      />
    </v-form>
  </div>
</template>

<script setup lang="ts">
  import { VForm } from "vuetify/components/VForm";
  import OfficeApi from "@/modules/api/office";
  import { useAppStore } from "@/stores/app";
  import { onMounted, ref } from "vue";
  import { VTextField } from "vuetify/components/VTextField";
  import type { OfficeWriteSchema } from "@/modules/api/office/schemas";

  const appStore = useAppStore();

  const api = new OfficeApi();
  const data = ref<OfficeWriteSchema>({
    name: "",
    address: "",
    emailAddress: "",
    phone: "",
    capacity: 0,
    colour: "",
  });

  onMounted(() => {
    appStore.$patch({
      pageTitle: "New office",
      hideAddButton: true,
    });
  });
</script>
