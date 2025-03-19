<template>
  <div class="d-flex justify-center ga-1">
    <v-icon
      v-for="idx in Array(count).keys()"
      :key="idx"
      :icon="idx === model ? mdiCircle : mdiCircleOutline"
      size="8"
      :color="colour"
    ></v-icon>
  </div>
</template>

<script setup lang="ts">
  import { mdiCircle, mdiCircleOutline } from "@mdi/js";
  import { VIcon } from "vuetify/components/VIcon";

  const model = defineModel<number>({ required: true });
  withDefaults(defineProps<{ count: number; colour?: string }>(), { colour: "primary" });
</script>
