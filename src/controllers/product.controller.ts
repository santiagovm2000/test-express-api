import { Request, Response } from "express";
import productService from "../services/product.service";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.util";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const newProduct = await productService.create(req.body);
  sendSuccessResponse(res, newProduct, "Product created successfully", 201);
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await productService.get(req);
  sendSuccessResponse(res, products, "Products retrieved successfully");
};

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
