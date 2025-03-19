import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";

import vuetify from "@/modules/vuetify";
import router from "@/router";
import pinia from "@/stores";

type MountParamsType = Parameters<typeof mount>;
type MountReturnType = ReturnType<typeof mount>;

export function mountWithDefaults(
  Comp: MountParamsType[0] & ReturnType<typeof defineComponent>,
  options?: MountParamsType[1] & { router?: typeof router },
): MountReturnType {
  const usableRouter = options?.router ?? router;
  const defaultPlugins = [pinia, usableRouter, vuetify];
  return mount(Comp, {
    ...options,
    global: {
      ...options?.global,
      plugins: [...(options?.global?.plugins ?? []), ...defaultPlugins],
    },
  });
}
