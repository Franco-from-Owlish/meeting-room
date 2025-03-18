import db from "@/modules/dexie";
import type MeetingRoomDatabase from "@/modules/dexie/database";
import type { Collection } from "dexie";
import type { SomeZodObject } from "zod";

export interface PaginationParameters {
  /* Number of elements to return */
  limit?: number;
  /* Offset from start */
  offset?: number;
}

export interface SchemaError {
  [key: string]: Array<string>;
}

export interface Response<T> {
  data?: T;
  error?: SchemaError;
  status: "success" | "failed";
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
  protected paginate(collection: Collection, paramaters: PaginationParameters): Collection {
    return collection.limit(paramaters.limit ?? 10).offset(paramaters.offset ?? 0);
  }

  /**
   * Validate data using a Zod schema.
   * @template TData extends { [key: string]: unknown } - Data to validate.
   * @param validator - Zod Schema used for validation.
   * @param data - Data to validate.
   * @returns Response with status, parsed data if successful, otherwise include response error.
   */
  protected async parseSchema<TData extends { [key: string]: unknown }>(
    validator: SomeZodObject,
    data: TData,
  ): Promise<Response<TData>> {
    const resp = await validator.safeParseAsync(data);

    if (resp.success) {
      return {
        data: resp.data as TData,
        status: "success",
      };
    }

    const errorDetails: SchemaError = {};
    resp.error.errors.forEach((err) => {
      // Added in place, no need to reassign
      this.appendFieldError(errorDetails, err.path[0] as string, [err.message]);
    });
    return {
      error: errorDetails,
      status: "failed",
    };
  }

  /**
   * Append messages to an existing ValidationError object in place at specified field.
   * @param errorDetails - Existing ValidationError object to append to.
   * @param field - Field name.
   * @param messages - Messages to add to the details object at specified field.
   */
  protected appendFieldError(
    errorDetails: SchemaError,
    field: string,
    messages: Array<string>,
  ): void {
    const errArray: Array<string> = errorDetails[field] ?? [];
    errArray.push(...messages);
    errorDetails[field] = errArray;
  }
}
