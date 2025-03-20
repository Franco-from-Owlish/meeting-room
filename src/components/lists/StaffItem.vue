<template>
  <v-list-item>
    <template #prepend>
      <v-avatar :image="StaffAvatars[member.avatar]"></v-avatar>
    </template>

    <template #title> {{ member.firstName }} {{ member.lastName }} </template>

    <template #append>
      <v-menu activator="parent">
        <template #activator>
          <v-icon
            variant="outlined"
            color="black"
            :icon="mdiDotsVertical"
          />
        </template>
        <v-list>
          <v-list-item @click="editStaff()"> Edit </v-list-item>
          <v-list-item @click="deleteDialog = true"> Delete </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <ConfirmationDialog
      v-model="deleteDialog"
      text="Are you sure you want to delete staff memeber?"
      confirm-text="Delete staff member"
      cancel-text="Keep staff member"
      :submit="() => deleteStaff()"
    />
  </v-list-item>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { mdiDotsVertical } from "@mdi/js";
  import { VAvatar } from "vuetify/components/VAvatar";
  import { VIcon } from "vuetify/components/VIcon";
  import { VList, VListItem } from "vuetify/components/VList";
  import { VMenu } from "vuetify/components/VMenu";

  import StaffAvatars from "@/data/avatars";
  import StaffApi from "@/modules/api/staff";
  import { type StaffSchema } from "@/modules/api/staff/schemas";
  import { useAppStore } from "@/stores/app";
  import ConfirmationDialog from "../dialogs/ConfirmationDialog.vue";

  type VListItemProps = /* @vue-ignore */ VListItem["$props"];

  const props = defineProps<VListItemProps & { member: StaffSchema }>();

  const deleteDialog = ref<boolean>(false);

  const api = new StaffApi();
  const appStore = useAppStore();

  async function deleteStaff() {
    await api.deleteStaff(props.member.id);
    appStore.$patch({
      staffUpdated: true,
    });
  }

  function editStaff() {
    appStore.showModal("staff", props.member.id.toString());
    appStore.$patch({
      staffUpdated: true,
    });
  }
</script>
