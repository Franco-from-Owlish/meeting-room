import { mountWithDefaults } from "@test/utils";
import { describe, expect, it } from "vitest";

import PeopleIcon from "@/components/icons/PeopleIcon.vue";

describe("PeopleIcon", () => {
  it("renders properly", () => {
    const wrapper = mountWithDefaults(PeopleIcon);

    expect(wrapper.html()).toContain("svg");
  });
});
