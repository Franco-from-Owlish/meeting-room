import { z } from "zod";

import { AllowedAvatars } from "@/data/avatars";

/* Validator for staff write */
export const zStaffWriteSchema = z.object({
  firstName: z.string().min(2, "First name must be longer than 2 characters."),
  lastName: z.string().min(2, "Last name must be longer than 2 characters."),
  avatar: z.enum(AllowedAvatars),
});

/* Staff write schema */
export type StaffWriteSchema = z.infer<typeof zStaffWriteSchema>;

/* Default staff schema */
export type StaffSchema = StaffWriteSchema & {
  id: number;
};
