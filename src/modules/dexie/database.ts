import Dexie, { type EntityTable } from "dexie";

import Office from "@/modules/dexie/entities/office";

import OfficeStaff from "./entities/officeStaff";
import StaffMember from "./entities/staff";

export default class MeetingRoomDatabase extends Dexie {
  offices!: EntityTable<Office, "id">;
  staff!: EntityTable<StaffMember, "id">;
  officeStaff!: EntityTable<OfficeStaff, "id">;

  constructor() {
    super("MeetingRoomDatabase");
    this.version(1).stores({
      offices: "++id, name",
      staff: "++id, firstName, lastName",
      officeStaff: "++id, [officeId+staffMemberId], staffMemberId",
    });
    this.offices.mapToClass(Office);
    this.staff.mapToClass(StaffMember);
    this.officeStaff.mapToClass(OfficeStaff);
  }
}
