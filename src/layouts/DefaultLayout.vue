<template>
  <v-app>
    <v-layout>
      <v-main>
        <v-app-bar
          density="prominent"
          class="elevation-0"
        >
          <template #title>
            <span id="title">{{ appStore.pageTitle }}</span>
          </template>
        </v-app-bar>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
    <AddButton />
    <AddDialog />
  </v-app>
</template>

<script setup lang="ts">
  import { VApp } from "vuetify/components/VApp";
  import { VAppBar } from "vuetify/components/VAppBar";
  import { VLayout } from "vuetify/components/VLayout";
  import { VMain } from "vuetify/components/VMain";
  import { VContainer } from "vuetify/components/VGrid";
  import { useAppStore } from "@/stores/app";
  import AddButton from "@/components/buttons/AddButton.vue";
  import AddDialog from "@/components/dialogs/AddDialog.vue";

  const appStore = useAppStore();
</script>

<style lang="scss" scoped>
  span#title {
    font-weight: 600;
    font-size: 1.75rem;
    line-height: 100%;
    letter-spacing: -2%;
    vertical-align: middle;
    text-transform: capitalize;
    color: "#484954";
  }
</style>
