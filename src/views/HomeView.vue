<template>
  <div>
    <OfficeCard
      v-for="office in offices"
      :key="office.id"
      :office="office"
    />
  </div>
</template>

<script setup lang="ts">
  import OfficeCard from "@/components/cards/OfficeCard.vue";
  import OfficeApi from "@/modules/api/office";
  import type { OfficeSchema } from "@/modules/api/office/schemas";
  import { onMounted, ref } from "vue";

  const officeApi = new OfficeApi();
  const offices = ref<Array<OfficeSchema>>([]);

  async function fetchOffices() {
    offices.value = await officeApi.getAllOffices();
  }

  onMounted(() => {
    fetchOffices();
  });
</script>
