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
          <span class="dialogTitle">{{ isEdit ? "Edit" : "New" }} Staff Member</span>
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
        <SectionTitle>Avatar</SectionTitle>

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
          @click="submit()"
          >{{ isEdit ? "Update" : "Add" }} Staff Member</v-btn
        >
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { mdiArrowLeft, mdiCloseCircleOutline } from "@mdi/js";
  import { useRoute } from "vue-router";
  import { VBtn } from "vuetify/components/VBtn";
  import { VCard } from "vuetify/components/VCard";
  import { VDialog } from "vuetify/components/VDialog";
  import { VRow, VSpacer } from "vuetify/components/VGrid";
  import { VIcon } from "vuetify/components/VIcon";
  import { VTextField } from "vuetify/components/VTextField";

  import TabDelimiter from "@/components/delimiters/TabDelimiter.vue";
  import SectionTitle from "@/components/headings/SectionTitle.vue";
  import AvatarRadio from "@/components/radios/AvatarRadio.vue";
  import StaffApi from "@/modules/api/staff";
  import type { StaffWriteSchema } from "@/modules/api/staff/schemas";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();
  const route = useRoute();

  const staffId = computed<number>(() => parseInt(route.query["staff"]?.toString() ?? "0"));
  const isEdit = computed<boolean>(() => staffId.value > 0);
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
    avatar: "Balloons",
  });

  function submit() {
    if (isEdit.value) {
      updateStaffMember();
    } else {
      createStaffMember();
    }
    appStore.hideModals();
  }

  async function createStaffMember() {
    await api.createStaffMember(data.value);
  }

  async function updateStaffMember() {
    await api.updateMember({ ...data.value, id: staffId.value });
  }

  async function fetchStaff() {
    const resp = await api.getStaffMember(staffId.value);
    data.value = resp;
  }

  watch(isEdit, (value) => {
    if (value) {
      fetchStaff();
    }
  });
</script>
