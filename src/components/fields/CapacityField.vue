<template>
  <v-text-field
    v-model="computedModel"
    placeholder="Maximum Capacity"
    label="Maximum Capacity"
    suffix="Staff Members"
    type="number"
  >
  </v-text-field>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { VTextField } from "vuetify/components/VTextField";

  const model = defineModel<number>({ required: true });
  const computedModel = computed<number | undefined>({
    get: () => (model.value > 0 ? model.value : undefined),
    set: (value: string | number | undefined) => {
      if (typeof value === "string") {
        value = parseInt(value);
      }
      model.value = value == undefined || value < 0 ? 0 : value;
    },
  });
</script>
