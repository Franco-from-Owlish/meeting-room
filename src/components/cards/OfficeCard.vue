<template>
  <v-card>
    <template #title>
      {{ office.name }}
    </template>

    <template #text>
      <v-row>
        <PeopleIcon />
        <span id="staff-detail">
          <span id="staff-count-detail">
            {{ office.staffCount }}
          </span>
          Staff members in office
        </span>
      </v-row>
    </template>
  </v-card>
</template>

<script setup lang="ts">
  import type { OfficeSchema } from "@/modules/api/office/schemas";
  import { VCard } from "vuetify/components/VCard";
  import { VRow } from "vuetify/components/VGrid";
  import PeopleIcon from "@/components/icons/PeopleIcon.vue";

  defineProps<{
    office: OfficeSchema;
  }>();
</script>
