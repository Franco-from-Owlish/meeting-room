<template>
  <div>
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

      <SectionTitile>Office Colour</SectionTitile>

      <ColourRadio v-model="data.colour" />

      <v-row class="my-4">
        <v-btn
          variant="flat"
          width="232px"
          class="my-4"
          @click="createOffice()"
        >
          Add Office
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
  import { VForm } from "vuetify/components/VForm";
  import { VBtn } from "vuetify/components/VBtn";
  import OfficeApi from "@/modules/api/office";
  import { useAppStore } from "@/stores/app";
  import { markRaw, onMounted, ref, toValue } from "vue";
  import { VTextField } from "vuetify/components/VTextField";
  import type { OfficeWriteSchema } from "@/modules/api/office/schemas";
  import { useRouter } from "vue-router";
  import CapacityField from "@/components/fields/CapacityField.vue";
  import ColourRadio from "@/components/radios/ColourRadio.vue";
  import SectionTitile from "@/components/headings/SectionTitile.vue";

  const appStore = useAppStore();
  const router = useRouter();

  const api = new OfficeApi();
  const data = ref<OfficeWriteSchema>({
    name: "Specno",
    address: "10 Willie Van Schoor Dr, Bo Oakdale",
    emailAddress: "info@specno.com",
    phone: "0823649864",
    capacity: 25,
    colour: "#FFBE0B",
  });

  async function createOffice() {
    const resp = await api.createOffice(data.value);
    router.push({
      name: "OfficeDetail",
      params: { id: resp.id },
    });
  }

  onMounted(() => {
    appStore.$patch({
      pageTitle: "New office",
      hideAddButton: true,
    });
  });
</script>
