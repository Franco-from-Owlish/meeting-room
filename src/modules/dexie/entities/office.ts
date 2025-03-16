import { Entity, type IndexableTypeArray } from "dexie";
import type MeetingRoomDatabase from "@/modules/dexie/database";

export default class Office extends Entity<MeetingRoomDatabase> {
  id!: number;
  name!: string;
  /* Physical Address */
  address!: string;
  emailAddress!: string;
  phone!: string;
  /* Maximum members assignable to office */
  capacity!: number;
  colour!: string;

  /**
   * Get associated staff members.
   * @returns Office-StaffMember relationship.
   */
  async staff(): Promise<IndexableTypeArray> {
    return await this.db.officeStaff
      .orderBy("staffMemberId")
      .filter((officeStaff) => officeStaff.officeId === this.id)
      .uniqueKeys();
  }

  /**
   * Get number of associated staff members.
   * @returns Number of staff.
   */
  async staffCount(): Promise<number> {
    return await this.db.officeStaff
      .filter((officeStaff) => officeStaff.officeId === this.id)
      .count();
  }
}
