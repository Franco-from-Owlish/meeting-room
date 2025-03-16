import { Entity } from "dexie";
import type MeetingRoomDatabase from "../database";

export default class StaffMember extends Entity<MeetingRoomDatabase> {
  id!: number;
  firstName!: string;
  lastName!: string;
  avatar!: string;
}
