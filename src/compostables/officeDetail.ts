import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import OfficeApi from "@/modules/api/office";
import type { OfficeDetailSchema } from "@/modules/api/office/schemas";

export default function useOfficeDetail() {
  const api = new OfficeApi();

  const route = useRoute();

  const officeId = computed<number>(() => parseInt((route.params["id"] as string) ?? "0"));
  const office = ref<OfficeDetailSchema>();

  async function fetchOffice() {
    const resp = await api.getOffice(officeId.value);
    office.value = resp;
  }

  function handleOfficeIdUpdate() {
    if (officeId.value === 0) return;
    fetchOffice();
  }

  watch(() => officeId, handleOfficeIdUpdate);

  return {
    office,
    officeId,
    fetchOffice,
    handleOfficeIdUpdate,
  };
}
