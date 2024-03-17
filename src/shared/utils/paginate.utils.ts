import { HydratedDocument } from 'mongoose';

export class PaginateUtils {
  private static instance: PaginateUtils;
  constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new PaginateUtils();
    }
    return this.instance;
  }

  convert<T>(product: HydratedDocument<T>): T {
    const json = product.toObject({ versionKey: false });
    const id = json._id; // id must be converted to _id which is breaking changes
    delete json._id;
    return { ...json, id: String(id) } as T;
  }
}
