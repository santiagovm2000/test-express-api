import { Request } from "express";
import { IOrder, Order } from "../models/order.model";
import { BaseService, PaginatedResult } from "./base.service";

/**
 * Service class for managing orders.
 * Extends the BaseService to provide common CRUD operations for the Order model.
 */
class OrderService extends BaseService<IOrder> {
  constructor() {
    super(Order);
  }

  /**
   * Retrieves a paginated list of orders for a specific user.
   *
   * @param userId - The ID of the user whose orders are to be retrieved.
   * @param req - The HTTP request object containing query parameters for pagination and filtering.
   * @returns A promise that resolves to a paginated result containing the user's orders.
   */
  async getByUserId(
    userId: string,
    req: Request
  ): Promise<PaginatedResult<IOrder>> {
    const baseQuery = Order.find({ user: userId });
    return this.paginateResponse(req, baseQuery);
  }
}

export default new OrderService();
