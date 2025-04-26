// src/models/order.model.ts
import { model, Schema, Types } from "mongoose";

interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
}

interface IOrder {
  user: Types.ObjectId;
  products: IOrderItem[];
  totalAmount: number;
  totalProducts: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    products: {
      type: [orderItemSchema],
      validate: {
        validator: (arr: IOrderItem[]) => arr.length > 0,
        message: "Order must contain at least one item",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalProducts: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);
export { IOrder, Order, IOrderItem };
