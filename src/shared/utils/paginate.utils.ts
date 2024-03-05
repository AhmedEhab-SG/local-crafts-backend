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
    const id = json._id;
    delete json._id;
    return { id: String(id), ...json } as T;
  }
}
