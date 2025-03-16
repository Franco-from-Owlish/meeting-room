import type { StaffSchema } from "@/modules/api/staff/schemas";

/* Office schema used for list data */
export type OfficeSchema = {
  id: number;
  name: string;
  address: string;
  emailAddress: string;
  phone: string;
  capacity: number;
  colour: string;
  staffCount: number;
};

/* Full office schema */
export type DetailOfficeSchema = OfficeSchema & {
  staff: Array<StaffSchema>;
};
