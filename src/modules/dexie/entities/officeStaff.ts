import { Entity } from "dexie";
import type MeetingRoomDatabase from "../database";

export default class OfficeStaff extends Entity<MeetingRoomDatabase> {
  id!: number;
  officeId!: number;
  staffMemberId!: number;
}

