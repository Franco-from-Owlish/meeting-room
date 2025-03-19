<template>
  <v-dialog v-model="show">
    <v-card class="pa-3">
      <template #title>
        <v-row
          class="pa-2 mb-2"
          justify="center"
        >
          <v-icon
            :icon="mdiArrowLeft"
            v-if="tab > 0"
            @click="tab--"
          />
          <v-spacer />
          <span class="dialogTitle">New Staff Member</span>
          <v-spacer />
          <v-icon
            :icon="mdiCloseCircleOutline"
            class="pa-1"
            color="primary-dark"
            @click="show = false"
          />
        </v-row>
      </template>

      <div v-show="tab === 0">
        <v-text-field
          v-model="data.firstName"
          placeholder="First Name"
          label="First Name"
        />
        <v-text-field
          v-model="data.lastName"
          placeholder="Last Name"
          label="Last Name"
        />
      </div>

      <div
        v-show="tab === 1"
        class="mb-2"
      >
        <SectionTitile>Avatar</SectionTitile>

        <AvatarRadio v-model="data.avatar" />
      </div>

      <TabDelimiter
        v-model="tab"
        :count="2"
      />

      <template #actions>
        <v-btn
          v-if="tab === 0"
          @click="tab++"
          >Next</v-btn
        >
        <v-btn
          v-else
          @click="createStaffMember()"
          >Add Staff Member</v-btn
        >
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
  import { VTextField } from "vuetify/components/VTextField";

  import TabDelimiter from "@/components/delimiters/TabDelimiter.vue";
  import StaffApi from "@/modules/api/staff";
  import type { StaffWriteSchema } from "@/modules/api/staff/schemas";
  import { useAppStore } from "@/stores/app";
  import SectionTitile from "../headings/SectionTitile.vue";
  import AvatarRadio from "../radios/AvatarRadio.vue";

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
  const data = ref<StaffWriteSchema>({
    firstName: "",
    lastName: "",
    avatar: "Batsman",
  });

  async function createStaffMember() {
    await api.createStaffMember(data.value);
    appStore.hideModals();
  }
</script>
