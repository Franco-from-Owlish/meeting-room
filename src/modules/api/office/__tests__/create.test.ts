import { describe, expect, it } from "vitest";

import OfficeApi from "../index";
import type { OfficeWriteSchema } from "../schemas";

describe("OfficeApi", () => {
  const api = new OfficeApi();

  describe("createOffice", () => {
    it("can add a record", async () => {
      const data: OfficeWriteSchema = {
        name: "test",
        phone: "0825546547",
        emailAddress: "test@test.com",
        address: "Cape Town",
        colour: "#000000",
        capacity: 5,
      };

      const resp = await api.createOffice(data);
      expect(resp).toMatchObject({
        ...data,
        staffCount: 0,
      });
    });
  });
});
