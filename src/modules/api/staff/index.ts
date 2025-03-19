import BaseApi, { type PaginationParameters } from "@/modules/api/base";
import {
  type StaffSchema,
  type StaffWriteSchema,
  zStaffWriteSchema,
} from "@/modules/api/staff/schemas";

export default class StaffApi extends BaseApi {
  /**
   * Create a new staff member.
   * @param data - Staff member data.
   * @returns Detailed staff data.
   */
  async createStaffMember(data: StaffWriteSchema): Promise<StaffSchema> {
    const resp = await this.parseSchema(zStaffWriteSchema, data);
    if (resp.status === "failed") throw Error(Object(resp.error).values());
    // if (resp.status === "success") {
    const id = await this.database.staff.add(resp.data!);
    return this.getStaffMember(id);
    // }
  }

  /**
   * Get staff member details.
   * @param id - Staff member primary key.
   * @returns Detailed office data.
   */
  async getStaffMember(id: number): Promise<StaffSchema> {
    const data = await this.database.staff.get(id);
    if (data == undefined) {
      throw Error("404");
    }
    return data;
  }

  /**
   * List all offices.
   * @param pagination - Pagination data.
   * @returns Paginated list of offices.
   */
  async getAllStaff(pagination?: PaginationParameters): Promise<Array<StaffSchema>> {
    const collection = this.paginate(this.database.staff.orderBy("id"), pagination ?? {});
    return await collection.toArray();
  }

  async addToOffice(officeId: number, staff: number[]) {
    const items = staff.flatMap((staffMemberId) => {
      return { officeId, staffMemberId };
    });
    return this.database.officeStaff.bulkAdd(items);
  }
}
