<template>
  <v-form class="mt-4">
    <v-text-field
      v-model="data.name"
      placeholder="Office Name"
      label="Office Name"
    />
    <v-text-field
      v-model="data.address"
      placeholder="Physical Address"
      label="Physical Address"
    />
    <v-text-field
      v-model="data.emailAddress"
      placeholder="Email address"
      label="Email Address"
    />
    <v-text-field
      v-model="data.phone"
      placeholder="Phone Number"
      label="Phone Number"
    />
    <CapacityField v-model="data.capacity" />

    <SectionTitle>Office Colour</SectionTitle>

    <ColourRadio v-model="data.colour" />

    <v-row class="my-4">
      <slot name="actions"></slot>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
  import { VForm } from "vuetify/components/VForm";
  import { VRow } from "vuetify/components/VGrid";
  import { VTextField } from "vuetify/components/VTextField";

  import CapacityField from "@/components/fields/CapacityField.vue";
  import SectionTitle from "@/components/headings/SectionTitle.vue";
  import ColourRadio from "@/components/radios/ColourRadio.vue";
  import type { OfficeWriteSchema } from "@/modules/api/office/schemas";

  const data = defineModel<OfficeWriteSchema>({ required: true });
</script>
