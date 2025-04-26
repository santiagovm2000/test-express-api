import { Request } from "express";
import { IOrder, Order } from "../models/order.model";
import { BaseService, PaginatedResult } from "./base.service";

class OrderService extends BaseService<IOrder> {
  constructor() {
    super(Order);
  }

  async getByUserId(
    userId: string,
    req: Request
  ): Promise<PaginatedResult<IOrder>> {
    const baseQuery = Order.find({ user: userId });
    return this.paginateResponse(req, baseQuery);
  }
}

export default new OrderService();
