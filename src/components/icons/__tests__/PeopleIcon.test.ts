import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";

import PeopleIcon from "@/components/icons/PeopleIcon.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(PeopleIcon);
    expect(wrapper.html).toContain("svg");
  });
});
