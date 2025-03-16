import BaseApi, { type PaginationParameters } from "@/modules/api/base";
import type { DetailOfficeSchema, OfficeSchema } from "@/modules/api/office/schemas";
import type Office from "@/modules/dexie/entities/office";
import type { StaffSchema } from "../staff/schemas";

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

  async createOffice(data: OfficeSchema): Promise<DetailOfficeSchema> {
    const id = await this.database.offices.add(data);
    return this.getOffice(id);
  }

  async getOffice(id: number): Promise<DetailOfficeSchema> {
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
   * @param pagination - Pagination data.
   * @returns Paginated list of offices.
   */
  async getOffices(pagination: PaginationParameters): Promise<Array<OfficeSchema>> {
    const collection = this.paginate(this.database.offices.orderBy("id"), pagination);
    const data = await collection.toArray();
    return Promise.all(
      data.flatMap<Promise<OfficeSchema>>(async (e) => await this.serializeOffice(e)),
    );
  }
}
