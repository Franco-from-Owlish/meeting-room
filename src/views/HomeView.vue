<template>
  <div>
    <OfficeCard
      v-for="office in offices"
      :key="office.id"
      :office="office"
      class="mb-4"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";

  import OfficeCard from "@/components/cards/OfficeCard.vue";
  import OfficeApi from "@/modules/api/office";
  import type { OfficeSchema } from "@/modules/api/office/schemas";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();

  const officeApi = new OfficeApi();
  const offices = ref<Array<OfficeSchema>>([]);

  async function fetchOffices() {
    offices.value = await officeApi.getAllOffices();
  }

  onMounted(() => {
    fetchOffices();
    appStore.$patch({
      pageTitle: "All offices",
      hideAddButton: true,
    });
  });
</script>
