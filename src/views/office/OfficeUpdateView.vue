<template>
  <div>
    <OfficeForm
      v-model="data"
      class="mt-4"
    >
      <template #actions>
        <v-btn
          variant="flat"
          width="232px"
          class="my-4 mx-auto"
          @click="updateOffice()"
        >
          Update Office
        </v-btn>
        <v-btn
          variant="text"
          width="232px"
          class="mx-auto"
          @click="deleteOffice()"
        >
          Delete Office
        </v-btn>
      </template>
    </OfficeForm>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import { VBtn } from "vuetify/components/VBtn";

  import OfficeForm from "@/components/forms/OfficeForm.vue";
  import useOfficeDetail from "@/compostables/officeDetail";
  import OfficeApi from "@/modules/api/office";
  import type { OfficeSchema, OfficeWriteSchema } from "@/modules/api/office/schemas";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();
  const router = useRouter();

  const api = new OfficeApi();
  const { office, handleOfficeIdUpdate, officeId } = useOfficeDetail();

  const data = ref<OfficeWriteSchema>({
    name: "",
    address: "",
    emailAddress: "",
    phone: "",
    capacity: 0,
    colour: "",
  });

  function updateData() {
    if (office.value) {
      data.value = office.value;
    }
  }

  async function updateOffice() {
    const updateData: Omit<OfficeSchema, "staffCount"> = {
      id: officeId.value,
      ...data.value,
    };
    const resp = await api.updateOffice(updateData);
    router.push({
      name: "OfficeDetail",
      params: { id: resp.id },
    });
  }

  async function deleteOffice() {
    await api.deleteOffice(officeId.value);
    router.push({
      name: "Home",
    });
  }

  onMounted(() => {
    appStore.$patch({
      pageTitle: "Edit office",
      hideAddButton: true,
    });
    handleOfficeIdUpdate();
    updateData();
  });

  watch(
    () => office.value?.id,
    () => {
      updateData();
    },
  );
</script>
