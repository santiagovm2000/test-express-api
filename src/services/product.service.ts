import { Request } from "express";
import { IProduct, Product } from "../models/product.model";
import { BaseService, PaginatedResult } from "./base.service";

class ProductService extends BaseService<IProduct> {
  constructor() {
    super(Product);
  }

  async getByIds(
    ids: string[],
    req: Request
  ): Promise<PaginatedResult<IProduct>> {
    const baseQuery = Product.find({ _id: { $in: ids } });
    return this.paginateResponse(req, baseQuery);
  }
}

export default new ProductService();
