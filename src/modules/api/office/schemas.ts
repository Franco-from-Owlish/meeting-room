import type { StaffSchema } from "@/modules/api/staff/schemas";

/* Office create data */
export type OfficeWriteSchema = {
  name: string;
  address: string;
  emailAddress: string;
  phone: string;
  capacity: number;
  colour: string;
};

/* Office schema used for list data */
export type OfficeSchema = OfficeWriteSchema & {
  id: number;
  staffCount: number;
};

/* Full office schema */
export type OfficeDetailSchema = OfficeSchema & {
  staff: Array<StaffSchema>;
};
