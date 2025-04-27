import { Request, Response } from "express";
import orderService from "../services/order.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.util";
import productService from "../services/product.service";
import { IOrderItem } from "../models/order.model";
import _ from "lodash";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Checks if the provided array of products is either not an array or is empty.
 *
 * @param products - An array of products implementing the `IOrderItem` interface.
 * @returns `true` if the input is not an array or if the array is empty, otherwise `false`.
 */
const dontHaveProducts = (products: IOrderItem[]): boolean => {
  return !Array.isArray(products) || products.length === 0;
};

/**
 * Validates if any products in an order are out of stock.
 *
 * @param products - An array of order items, each containing a product ID and the quantity ordered.
 * @param foundProducts - An array of product objects retrieved from the database, each containing stock information.
 * @returns A string message listing the names of products that are out of stock, or `null` if all products are sufficiently stocked.
 */
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

/**
 * Extracts the `sub` claim from the JWT token in the Authorization header of the request.
 *
 * @param req - The HTTP request object containing the Authorization header.
 * @returns The `sub` claim from the decoded JWT token, which can be a string or undefined if not present.
 *
 * @throws Will throw an error if the Authorization header is missing or improperly formatted.
 */
export const getTokenSub = (req: Request): string | undefined => {
  const authHeader = req.headers.authorization;
  const token = authHeader!.substring(7);
  const decoded = jwt.decode(token) as JwtPayload | null;
  return decoded?.sub;
};

/**
 * Handles the creation of a new order.
 *
 * @param req - The HTTP request object containing the order details in the body.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void.
 *
 * The function performs the following steps:
 * 1. Validates that the order contains at least one product.
 * 2. Retrieves the product details from the database using their IDs.
 * 3. Checks if any of the products are out of stock.
 * 4. Automatically calculates the total quantity of products in the order.
 * 5. Associates the order with the user who created it, based on the token.
 * 6. Creates the order in the database and sends a success response.
 *
 * If any validation fails, an error response is sent with the appropriate status code and message.
 */
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

/**
 * Retrieves a list of orders and sends a success response with the retrieved data.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @returns A promise that resolves to void.
 */
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const orders = await orderService.get(req);
  sendSuccessResponse(res, orders, "Orders retrieved successfully");
};

/**
 * Retrieves an order by its ID.
 *
 * @param req - The HTTP request object, containing the order ID in the route parameters.
 * @param res - The HTTP response object used to send the response.
 * @returns A promise that resolves to void. Sends a success response with the order data
 *          if found, or an error response if the order is not found.
 *
 * @throws Will propagate any errors thrown by the `orderService.getById` method.
 */
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

/**
 * Updates an existing order based on the provided request parameters and body.
 *
 * @param req - The HTTP request object containing the order ID in `req.params.id`
 *              and the updated order data in `req.body`.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the updated
 *          order data if the update is successful, or an error response if the order
 *          is not found.
 */
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

/**
 * Deletes an order based on the provided ID in the request parameters.
 *
 * @param req - The HTTP request object containing the order ID in the parameters.
 * @param res - The HTTP response object used to send the response.
 * @returns A promise that resolves to void. Sends a success response if the order
 *          is deleted successfully, or an error response if the order is not found.
 */
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

/**
 * Retrieves orders associated with a specific user ID.
 *
 * @param req - The HTTP request object containing the user ID in the route parameters.
 * @param res - The HTTP response object used to send the response.
 * @returns A promise that resolves to void. Sends a success response with the retrieved orders.
 *
 */
export const getOrdersByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orders = await orderService.getByUserId(req.params.userId, req);
  sendSuccessResponse(res, orders, "Orders retrieved successfully");
};
