import { Request, Response } from "express";
import productService from "../services/product.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.util";

/**
 * Creates a new product.
 *
 * @param req - The HTTP request object containing the product details in the body.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the created product.
 */
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newProduct = await productService.create(req.body);
  sendSuccessResponse(res, newProduct, "Product created successfully", 201);
};

/**
 * Retrieves a list of products.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the list of products.
 */
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await productService.get(req);
  sendSuccessResponse(res, products, "Products retrieved successfully");
};

/**
 * Retrieves a product by its ID.
 *
 * @param req - The HTTP request object containing the product ID in the route parameters.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the product data if found,
 *          or an error response if the product is not found.
 */
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const product = await productService.getById(req.params.id);
  if (!product) {
    sendErrorResponse(res, "Product not found", 404);
    return;
  }
  sendSuccessResponse(res, product, "Product retrieved successfully");
};

/**
 * Updates an existing product by its ID.
 *
 * @param req - The HTTP request object containing the product ID in the route parameters
 *              and the updated product data in the body.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response with the updated product data
 *          if the update is successful, or an error response if the product is not found.
 */
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const updatedProduct = await productService.update(req.params.id, req.body);
  if (!updatedProduct) {
    sendErrorResponse(res, "Product not found", 404);
    return;
  }
  sendSuccessResponse(res, updatedProduct, "Product updated successfully");
};

/**
 * Deletes a product by its ID.
 *
 * @param req - The HTTP request object containing the product ID in the route parameters.
 * @param res - The HTTP response object used to send the response back to the client.
 * @returns A promise that resolves to void. Sends a success response if the product is deleted successfully,
 *          or an error response if the product is not found.
 */
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const deletedProduct = await productService.delete(req.params.id);
  if (!deletedProduct) {
    sendErrorResponse(res, "Product not found", 404);
    return;
  }
  sendSuccessResponse(res, deletedProduct, "Product deleted successfully");
};
