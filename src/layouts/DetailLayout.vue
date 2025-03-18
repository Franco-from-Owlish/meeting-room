<template>
  <v-app>
    <v-layout>
      <v-main>
        <v-app-bar
          class="elevation-0"
          color="background"
        >
          <v-app-bar-nav-icon
            :icon="mdiArrowLeft"
            color="on-surface"
          />

          <v-spacer />
          <v-app-bar-title>
            <span id="title">{{ appStore.pageTitle }}</span>
          </v-app-bar-title>
          <v-spacer />
          <v-spacer />
        </v-app-bar>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
    <template v-if="!appStore.hideAddButton">
      <AddButton />
      <AddDialog />
    </template>
  </v-app>
</template>

<script setup lang="ts">
  import { mdiArrowLeft } from "@mdi/js";
  import { VApp } from "vuetify/components/VApp";
  import { VAppBar, VAppBarNavIcon, VAppBarTitle } from "vuetify/components/VAppBar";
  import { VContainer, VSpacer } from "vuetify/components/VGrid";
  import { VLayout } from "vuetify/components/VLayout";
  import { VMain } from "vuetify/components/VMain";

  import AddButton from "@/components/buttons/AddButton.vue";
  import AddDialog from "@/components/dialogs/AddDialog.vue";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();
</script>

<style lang="scss" scoped>
  span#title {
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 100%;
    letter-spacing: -2%;
    vertical-align: middle;
    text-transform: capitalize;
    color: "#484954";
  }
</style>
