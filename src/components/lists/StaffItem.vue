<template>
  <v-list-item>
    <template #prepend>
      <v-avatar :image="StaffAvatars[member.avatar]"></v-avatar>
    </template>

    <template #title> {{ member.firstName }} {{ member.lastName }} </template>
  </v-list-item>
</template>

<script setup lang="ts">
  import { VAvatar } from "vuetify/components/VAvatar";
  import { VListItem } from "vuetify/components/VList";

  import StaffAvatars from "@/data/avatars";
  import { type StaffSchema } from "@/modules/api/staff/schemas";

  type VListItemProps = /* @vue-ignore */ VListItem["$props"];

  defineProps<VListItemProps & { member: StaffSchema }>();
</script>
