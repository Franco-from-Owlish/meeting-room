import BaseApi, { type PaginationParameters } from "@/modules/api/base";
import {
  type OfficeDetailSchema,
  type OfficeSchema,
  type OfficeWriteSchema,
  zOfficeWriteSchema,
} from "@/modules/api/office/schemas";
import type { StaffSchema } from "@/modules/api/staff/schemas";
import type Office from "@/modules/dexie/entities/office";

export default class OfficeApi extends BaseApi {
  private async serializeOffice(office: Office): Promise<OfficeSchema> {
    return {
      ...office,
      staffCount: await office.staffCount(),
    };
  }

  private async getOfficeStaff(office: Office): Promise<Array<StaffSchema>> {
    const staff = await office.staff();
    const data = await this.database.staff.filter((member) => staff.includes(member.id)).toArray();
    const members: Array<StaffSchema> = [];
    data.forEach((s) => members.push(s));
    return members;
  }

  /**
   * Create a new office.
   * @param data - Office data.
   * @returns Detailed office data.
   */
  async createOffice(data: OfficeWriteSchema): Promise<OfficeDetailSchema> {
    const resp = await this.parseSchema(zOfficeWriteSchema, data);
    // TODO: handle errors
    // if (resp.status === "failed") throw Error(Object.entries(resp.error));
    // if (resp.status === "success") {
    const id = await this.database.offices.add(resp.data!);
    return this.getOffice(id);
    // }
  }

  /**
   * Get office details.
   * @param id - Office primary key.
   * @returns Detailed office data.
   */
  async getOffice(id: number): Promise<OfficeDetailSchema> {
    const data = await this.database.offices.get(id);
    if (data == undefined) {
      throw Error("404");
    }
    return {
      ...(await this.serializeOffice(data)),
      staff: await this.getOfficeStaff(data),
    };
  }

  /**
   * List all offices.
   * @param pagination - Pagination data.
   * @returns Paginated list of offices.
   */
  async getAllOffices(pagination?: PaginationParameters): Promise<Array<OfficeSchema>> {
    const collection = this.paginate(this.database.offices.orderBy("id"), pagination ?? {});
    const data = await collection.toArray();
    return Promise.all(
      data.flatMap<Promise<OfficeSchema>>(async (e) => await this.serializeOffice(e)),
    );
  }

  /**
   * Update an existing office.
   * @param data - Office data.
   * @returns Detailed office data.
   */
  async updateOffice(data: Omit<OfficeSchema, "staffCount">): Promise<OfficeDetailSchema> {
    const resp = await this.parseSchema<OfficeWriteSchema>(zOfficeWriteSchema, data);
    const id = await this.database.offices.update(data.id, resp.data!);
    return this.getOffice(id);
  }

  /**
   * Delete an existing office.
   * @param data - Office data.
   */
  async deleteOffice(id: number) {
    const staff = await this.database.officeStaff
      .filter((officeStaff) => officeStaff.officeId === id)
      .primaryKeys();
    await Promise.all([
      await this.database.officeStaff.bulkDelete(staff),
      await this.database.offices.delete(id),
    ]);
  }
}
