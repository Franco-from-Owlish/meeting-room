import { describe, it, expect } from "vitest";

import OfficeApi from "../index";
import type { OfficeWriteSchema } from "../schemas";

describe("OfficeApi.createOffice", () => {
  const api = new OfficeApi();

  it("can add a record", async () => {
    const data: OfficeWriteSchema = {
      name: "test",
      phone: "+27215468899",
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
