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

  /**
   * @param officeId - Office primary key.
   * @param staff - List of staff primary keys.
   * @returns Operation status.
   */
  async addToOffice(officeId: number, staff: number[]) {
    const items = staff.flatMap((staffMemberId) => {
      return { officeId, staffMemberId };
    });
    return this.database.officeStaff.bulkAdd(items);
  }

  /**
   * Update an existing office.
   * @param data - Office data.
   * @returns Detailed office data.
   */
  async updateMember(data: StaffSchema): Promise<StaffSchema> {
    const resp = await this.parseSchema(zStaffWriteSchema, data);
    const id = await this.database.staff.update(data.id, resp.data!);
    return this.getStaffMember(id);
  }

  /**
   * Delete an existing office.
   * @param data - Office data.
   */
  async deleteStaff(id: number) {
    const staff = await this.database.officeStaff
      .filter((officeStaff) => officeStaff.staffMemberId === id)
      .primaryKeys();
    await Promise.all([
      await this.database.officeStaff.bulkDelete(staff),
      await this.database.staff.delete(id),
    ]);
  }
}
