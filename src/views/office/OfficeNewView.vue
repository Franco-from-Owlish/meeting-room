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
          class="my-4"
          @click="createOffice()"
        >
          Add Office
        </v-btn>
      </template>
    </OfficeForm>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { VBtn } from "vuetify/components/VBtn";

  import OfficeForm from "@/components/forms/OfficeForm.vue";
  import OfficeApi from "@/modules/api/office";
  import type { OfficeWriteSchema } from "@/modules/api/office/schemas";
  import { useAppStore } from "@/stores/app";

  const appStore = useAppStore();
  const router = useRouter();

  const api = new OfficeApi();
  const data = ref<OfficeWriteSchema>({
    name: "",
    address: "",
    emailAddress: "",
    phone: "",
    capacity: 0,
    colour: "",
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
