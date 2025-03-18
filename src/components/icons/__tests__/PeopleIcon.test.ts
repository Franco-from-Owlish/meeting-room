import { mount } from "@vue/test-utils";
import { describe, expect,it } from "vitest";

import PeopleIcon from "@/components/icons/PeopleIcon.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(PeopleIcon);
    expect(wrapper.html).toContain("svg");
  });
});
