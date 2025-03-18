<template>
  <v-card class="px-4">
    <div id="colourIndicator"></div>

    <template #title>
      <div class="companyName" @click="toOfficeDetail()">{{ office.name }}</div>
    </template>

    <template #text>
      <v-row class="mb-4">
        <v-list-item :prepend-icon="PeopleIcon">
          <span id="staff-detail">
            <span id="staff-count-detail">
              {{ office.staffCount }}
            </span>
            Staff members in office
          </span>
        </v-list-item>
      </v-row>
      <v-row align="center" justify="center">
        More info
        <v-icon :icon="moreInfo ? mdiChevronUp : mdiChevronDown" @click="moreInfo = !moreInfo" />
      </v-row>
      <v-row v-if="moreInfo">
        <v-list density="compact" bg-color="#FFF0">
          <v-list-item :prepend-icon="PhoneIcon">
            {{ office.phone }}
          </v-list-item>

          <v-list-item :prepend-icon="EmailIcon">
            {{ office.emailAddress }}
          </v-list-item>

          <v-list-item>
            <template #prepend>
              <v-icon>
                <PeopleIcon colour="primary-dark" />
              </v-icon>
            </template>
            Office Capacity: {{ office.capacity }}
          </v-list-item>

          <v-list-item :prepend-icon="LocationIcon">
            {{ office.address }}
          </v-list-item>
        </v-list>
      </v-row>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import type { OfficeSchema } from "@/modules/api/office/schemas";
import { VCard } from "vuetify/components/VCard";
import { VRow } from "vuetify/components/VGrid";
import { VIcon } from "vuetify/components/VIcon";
import { VList, VListItem } from "vuetify/components/VList";
import PeopleIcon from "@/components/icons/PeopleIcon.vue";
import { computed, ref } from "vue";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import PhoneIcon from "../icons/PhoneIcon.vue";
import EmailIcon from "../icons/EmailIcon.vue";
import LocationIcon from "../icons/LocationIcon.vue";
import { TinyColor } from "@ctrl/tinycolor";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  office: OfficeSchema;
}>();

const moreInfo = ref<boolean>(false);

function toOfficeDetail() {
  router.push({
    name: "OfficeDetail",
    params: { id: props.office.id },
  });
}

const shading = 7;
const colour = computed<{ base: string; dark: string; light: string }>(() => {
  const base = new TinyColor(props.office.colour);
  return {
    base: base.toHexString(),
    dark: base.darken(shading).toHexString(),
    light: base.lighten(shading).toHexString(),
  };
});
</script>

<style lang="scss" scoped>
.companyName {
  font-weight: 800;
  font-size: 1.5;
  line-height: 100%;
  letter-spacing: -2%;
  vertical-align: middle;
  text-transform: capitalize;
}

.v-card {
  background: linear-gradient(0deg,
      v-bind("colour.light") 0%,
      v-bind("colour.base") 50%,
      v-bind("colour.dark") 100%);
  background-repeat: repeat-y;
  background-size: 12px;
}
</style>
