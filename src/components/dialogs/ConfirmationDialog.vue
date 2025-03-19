<template>
  <v-dialog v-model="show">
    <v-card class="py-4 px-2">
      <template #title>
        <span class="font-weight-bold"> {{ text }} </span>
      </template>

      <v-btn
        block
        class="mb-4"
        color="primary"
        @click="submit()"
      >
        {{ confirmText }}
      </v-btn>
      <v-btn
        @click="show = false"
        block
        color="primary"
      >
        {{ cancelText }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { VBtn } from "vuetify/components/VBtn";
  import { VCard } from "vuetify/components/VCard";
  import { VDialog } from "vuetify/components/VDialog";

  const show = defineModel<boolean>();
  defineProps<{
    text: string;
    confirmText: string;
    cancelText: string;
    submit: () => void;
  }>();
</script>
