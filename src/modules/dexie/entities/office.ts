import { Entity } from "dexie";
import type MeetingRoomDatabase from "../database";
import type OfficeStaff from "./officeStaff";

export default class Office extends Entity<MeetingRoomDatabase> {
  id!: number;
  name!: string;
  /* Physical Address */
  address!: string;
  emailAddress!: string;
  phone!: string;
  /* Maximum members assignable to office */
  capacity!: number;
  color!: string;

  async staff(): Promise<Array<OfficeStaff>> {
    return await this.db.officeStaff
      .filter((offficeStaff) => offficeStaff.officeId === this.id)
      .toArray();
  }
}
