<template>
  <div>
    <template v-if="office == undefined">
      <SectionTitle>Fetching office...</SectionTitle>
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

      <v-text-field
        v-model="search"
        label="Search"
        placeholder="Jane Doe"
        :append-inner-icon="mdiMagnify"
        class="mt-4"
      ></v-text-field>

      <div class="d-flex align-center">
        <SectionTitle class="flex-grow-1">Staff Members in Office</SectionTitle>
        <span>{{ filteredStaff.length }}</span>
      </div>

      <v-list bg-color="#FFF0">
        <StaffItem
          v-for="staff in filteredStaff"
          :key="staff.id"
          :member="staff"
          class="mb-2"
        ></StaffItem>
      </v-list>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from "vue";
  import { mdiMagnify } from "@mdi/js";
  import { useRoute } from "vue-router";
  import { VRow } from "vuetify/components/VGrid";
  import { VList } from "vuetify/components/VList";
  import { VProgressCircular } from "vuetify/components/VProgressCircular";
  import { VTextField } from "vuetify/components/VTextField";

  import OfficeCard from "@/components/cards/OfficeCard.vue";
  import AddOfficeStaffDialog from "@/components/dialogs/AddOfficeStaffDialog.vue";
  import SectionTitle from "@/components/headings/SectionTitle.vue";
  import StaffItem from "@/components/lists/StaffItem.vue";
  import OfficeApi from "@/modules/api/office";
  import type { OfficeDetailSchema } from "@/modules/api/office/schemas";
  import type { StaffSchema } from "@/modules/api/staff/schemas";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();
  const route = useRoute();
  const api = new OfficeApi();

  appStore.$patch({
    pageTitle: "Office",
    hideAddButton: false,
  });

  const officeId = computed<number>(() => parseInt((route.params["id"] as string) ?? "0"));
  const office = ref<OfficeDetailSchema>();

  const search = ref<string>("");
  const filteredStaff = computed<StaffSchema[]>(() => {
    if (office.value == undefined) return [];
    return office.value.staff.filter(({ firstName, lastName }) =>
      `${firstName} ${lastName}`.toLowerCase().includes(search.value.toLowerCase()),
    );
  });

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
