import { Entity } from "dexie";
import type MeetingRoomDatabase from "../database";

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
}
