<template>
  <v-dialog v-model="show">
    <v-card>
      <template #title>
        <v-row
          class="pa-2"
          justify="center"
        >
          <v-icon :icon="mdiArrowLeft" />
          <v-spacer />
          <span class="dialogTitle">New Staff Member</span>
          <v-spacer />
          <v-icon
            :icon="mdiCloseCircleOutline"
            class="pa-1"
            color="primary-dark"
          />
        </v-row>
      </template>

      <TabDelimiter
        v-model="tab"
        :count="2"
      />

      <template #actions>
        <v-btn>Next</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { mdiArrowLeft, mdiCloseCircleOutline } from "@mdi/js";
  import { VBtn } from "vuetify/components/VBtn";
  import { VCard } from "vuetify/components/VCard";
  import { VDialog } from "vuetify/components/VDialog";
  import { VRow, VSpacer } from "vuetify/components/VGrid";
  import { VIcon } from "vuetify/components/VIcon";

  import TabDelimiter from "@/components/delimiters/TabDelimiter.vue";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();

  const show = computed<boolean>({
    get: () => appStore.showStaffModal,
    set: (value: boolean) => {
      if (value) {
        appStore.showModal("staff");
      } else {
        appStore.hideModals();
      }
    },
  });

  const tab = ref<number>(0);

    const api = new StaffApi();
  const data = ref<OfficeWriteSchema>({
    name: "Specno",
    address: "10 Willie Van Schoor Dr, Bo Oakdale",
    emailAddress: "info@specno.com",
    phone: "0823649864",
    capacity: 25,
    colour: "#FFBE0B",
  });

  async function createOffice() {
    const resp = await api.createOffice(data.value);
    router.push({
      name: "OfficeDetail",
      params: { id: resp.id },
    });
  }

</script>
