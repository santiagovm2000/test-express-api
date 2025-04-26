// src/controllers/order.controller.ts
import { Request, Response } from "express";
import orderService from "../services/order.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.util";
import productService from "../services/product.service";
import { IOrderItem } from "../models/order.model";
import _ from "lodash";
import jwt, { JwtPayload } from "jsonwebtoken";

const dontHaveProducts = (products: IOrderItem[]): boolean => {
  return !Array.isArray(products) || products.length === 0;
};

const validateOutOfStock = (
  products: IOrderItem[],
  foundProducts: any[]
): string | null => {
  const outOfStock = _.filter(foundProducts, (prod) => {
    const orderItem = products.find(
      (p) => p.product.toString() === prod._id.toString()
    );
    return orderItem != null && orderItem.quantity > prod.quantityInStock;
  });
  if (!_.isEmpty(outOfStock)) {
    const names = _.map(outOfStock, "name").join(", ");
    return `The following products are out of stock: ${names}`;
  }
  return null;
};

export const getTokenSub = (req: Request): string | string[] | undefined => {
  const authHeader = req.headers.authorization;
  const token = authHeader!.substring(7);
  const decoded = jwt.decode(token) as JwtPayload | null;
  return decoded?.sub;
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { products } = req.body as { products: IOrderItem[] };

  // Check if products are provided
  if (dontHaveProducts(products)) {
    sendErrorResponse(res, "Order must contain at least one product", 400);
    return;
  }

  const productIds = products.map((p) =>
    typeof p.product === "string" ? p.product : p.product.toString()
  );
  const foundProducts = await productService.getByIds(productIds, req);

  // Check if any of the products dont have stock
  const stockError = validateOutOfStock(products, foundProducts.items);
  if (stockError) {
    sendErrorResponse(res, stockError, 400);
    return;
  }

  //Auto calculate the total quantity of products
  req.body.totalProducts = products.length;

  //Add the id of the user who created the order from the token so nobody can do orders a name of another user
  const userId = getTokenSub(req);
  req.body.user = userId;

  const newOrder = await orderService.create(req.body);
  sendSuccessResponse(res, newOrder, "Order created successfully", 201);
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const orders = await orderService.get(req);
  sendSuccessResponse(res, orders, "Orders retrieved successfully");
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const order = await orderService.getById(req.params.id);
  if (!order) {
    sendErrorResponse(res, "Order not found", 404);
    return;
  }
  sendSuccessResponse(res, order, "Order retrieved successfully");
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updatedOrder = await orderService.update(req.params.id, req.body);
  if (!updatedOrder) {
    sendErrorResponse(res, "Order not found", 404);
    return;
  }
  sendSuccessResponse(res, updatedOrder, "Order updated successfully");
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deletedOrder = await orderService.delete(req.params.id);
  if (!deletedOrder) {
    sendErrorResponse(res, "Order not found", 404);
    return;
  }
  sendSuccessResponse(res, deletedOrder, "Order deleted successfully");
};

export const getOrdersByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orders = await orderService.getByUserId(req.params.userId, req);
  sendSuccessResponse(res, orders, "Orders retrieved successfully");
};
