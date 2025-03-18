import type { StaffSchema } from "@/modules/api/staff/schemas";
import { z } from "zod";

/* OfficeWriteSchema validator */
export const zOfficeWriteSchema = z.object({
  name: z.string().min(2, "Name must be longer than 2 characters."),
  address: z.string().nonempty("Physical address cannot be empty"),
  emailAddress: z.string().email(),
  phone: z.string().regex(/^0(\d{9})$/g), // basic 10 digit number
  capacity: z.number().gte(0, "Capacity cannot be negative"),
  colour: z.string().regex(/^#([a-fA-F0-9]{6})$/g), // 6 character hex string, preceding #, case insensitive
});

/* Office create data */
export type OfficeWriteSchema = z.infer<typeof zOfficeWriteSchema>;

/* Office schema used for list data */
export type OfficeSchema = OfficeWriteSchema & {
  id: number;
  staffCount: number;
};

/* Full office schema */
export type OfficeDetailSchema = OfficeSchema & {
  staff: Array<StaffSchema>;
};
