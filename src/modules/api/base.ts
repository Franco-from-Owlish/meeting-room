import db from "@/modules/dexie";
import type MeetingRoomDatabase from "@/modules/dexie/database";
import type { Collection } from "dexie";

export interface PaginationParameters {
  /* Number of elements to return */
  limit?: number;
  /* Offset from start */
  offset?: number;
}

/**
 * Base class for data access APIs.
 */
export default abstract class BaseApi {
  /* Database instance for queries */
  protected database: MeetingRoomDatabase;

  constructor() {
    this.database = db;
  }

  /**
   * Paginate a collection
   * @param collection - Collection to paginate.
   * @param paramaters - Pagination parameters.
   * @returns Paginated collection.
   */
  paginate(collection: Collection, paramaters: PaginationParameters): Collection {
    return collection.limit(paramaters.limit ?? 10).offset(paramaters.offset ?? 0);
  }
}
