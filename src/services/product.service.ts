import { Request } from "express";
import { IProduct, Product } from "../models/product.model";
import { BaseService, PaginatedResult } from "./base.service";

/**
 * Service class for managing products.
 * Extends the BaseService to provide common CRUD operations for the Product model.
 */
class ProductService extends BaseService<IProduct> {
  constructor() {
    super(Product);
  }

  /**
   * Retrieves a paginated list of products by their IDs.
   *
   * @param ids - An array of product IDs to retrieve.
   * @param req - The HTTP request object containing query parameters for pagination and filtering.
   * @returns A promise that resolves to a paginated result containing the products.
   */
  async getByIds(
    ids: string[],
    req: Request
  ): Promise<PaginatedResult<IProduct>> {
    const baseQuery = Product.find({ _id: { $in: ids } });
    return this.paginateResponse(req, baseQuery);
  }
}

export default new ProductService();
