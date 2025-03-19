<template>
  <v-select
    v-model="selected"
    :items="staff"
    return-object
    label="Staff members"
    chips
    multiple
  >
    <template #chip="{ item, props }">
      <v-chip v-bind="props">{{ item.value.firstName }} {{ item.value.lastName }}</v-chip>
    </template>

    <template #item="{ props: itemProps, item }">
      <StaffItem
        v-bind="{ ...itemProps, title: undefined }"
        :member="item.value"
      ></StaffItem>
    </template>
  </v-select>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from "vue";
  import { VChip } from "vuetify/components/VChip";
  import { VSelect } from "vuetify/components/VSelect";

  import StaffApi from "@/modules/api/staff";
  import type { StaffSchema } from "@/modules/api/staff/schemas";
  import StaffItem from "../lists/StaffItem.vue";

  const model = defineModel<number[]>();
  const selected = ref<StaffSchema[]>([]);

  const props = withDefaults(defineProps<{ exclude?: StaffSchema[] }>(), { exclude: () => [] });
  const exclusionIds = computed<number[]>(() => props.exclude.flatMap((e) => e.id));

  const api = new StaffApi();
  const staff = ref<StaffSchema[]>([]);

  async function fetchStaff() {
    const resp = await api.getAllStaff();
    staff.value = resp.filter((s) => !exclusionIds.value.includes(s.id));
  }

  onMounted(() => {
    fetchStaff();
  });

  watch(
    () => selected.value,
    (value) => {
      model.value = value.flatMap((v) => v.id);
    },
  );
</script>
