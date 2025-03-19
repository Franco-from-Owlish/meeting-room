<template>
  <div class="text-center mt-4">
    <v-dialog>
      <template #activator="{ props }">
        <v-btn v-bind="props">Add staff to office</v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card class="pa-2">
          <template #title>
            <span class="dialogTitle">Add Office Staff</span>
          </template>

          <StaffSelect v-model="staffIds" />

          <v-btn @click="save(isActive)">Save</v-btn>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import { type Ref, ref } from "vue";
  import { VBtn } from "vuetify/components/VBtn";
  import { VCard } from "vuetify/components/VCard";
  import { VDialog } from "vuetify/components/VDialog";

  import StaffSelect from "@/components/fields/StaffSelect.vue";
  import StaffApi from "@/modules/api/staff";

  const api = new StaffApi();
  const props = defineProps<{ officeId: number }>();

  const staffIds = ref<number[]>([]);

  async function save(show: Ref<boolean>) {
    const resp = await api.addToOffice(props.officeId, staffIds.value);
    if (resp) {
      show.value = false;
    }
  }
</script>
