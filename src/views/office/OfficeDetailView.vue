<template>
  <div>
    <template v-if="office == undefined">
      <SectionTitile>Fetching office...</SectionTitile>
      <v-row
        align="center"
        justify="center"
        class="my-6"
      >
        <v-progress-circular indeterminate />
      </v-row>
    </template>

    <template v-else>
      <OfficeCard :office="office"></OfficeCard>

      <AddOfficeStaffDialog :office-id="officeId"></AddOfficeStaffDialog>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  import { VRow } from "vuetify/components/VGrid";
  import { VProgressCircular } from "vuetify/components/VProgressCircular";

  import OfficeCard from "@/components/cards/OfficeCard.vue";
  import AddOfficeStaffDialog from "@/components/dialogs/AddOfficeStaffDialog.vue";
  import SectionTitile from "@/components/headings/SectionTitile.vue";
  import OfficeApi from "@/modules/api/office";
  import type { OfficeSchema } from "@/modules/api/office/schemas";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();
  const route = useRoute();
  const api = new OfficeApi();

  appStore.$patch({
    pageTitle: "Office",
  });

  const officeId = computed<number>(() => parseInt((route.params["id"] as string) ?? "0"));
  const office = ref<OfficeSchema>();

  async function fetchOffice() {
    const resp = await api.getOffice(officeId.value);
    office.value = resp;
  }

  function handleOfficeIdUpdate() {
    if (officeId.value === 0) return;
    fetchOffice();
  }

  onMounted(() => {
    handleOfficeIdUpdate();
  });

  watch(() => officeId, handleOfficeIdUpdate);
</script>
