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

          <StaffSelect
            v-model="staffIds"
            :exclude="office.staff"
          />

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
  import type { OfficeDetailSchema } from "@/modules/api/office/schemas";
  import StaffApi from "@/modules/api/staff";

  const api = new StaffApi();
  const props = defineProps<{ office: OfficeDetailSchema }>();
  const emit = defineEmits<{ updated: [] }>();

  const staffIds = ref<number[]>([]);

  async function save(show: Ref<boolean>) {
    const resp = await api.addToOffice(props.office.id, staffIds.value);
    if (resp) {
      emit("updated");
      show.value = false;
    }
  }
</script>
