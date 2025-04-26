import { Schema, model } from "mongoose";

interface IProduct {
  productCode: string;
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 10,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
      validate: {
        validator: (value: number) =>
          /^\d+(\.\d{1,2})?$/.test(value.toString()),
        message: "Price must have at most 2 decimal places",
      },
    },
    quantityInStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export { Product, IProduct };
