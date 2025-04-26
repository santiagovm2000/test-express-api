import { Request } from "express";
import _ from "lodash";
import { Model, Query } from "mongoose";

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

abstract class BaseService<T> {
  constructor(private model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    const savedEntity = await entity.save();
    return savedEntity.toObject() as T;
  }

  async get(req: Request): Promise<PaginatedResult<T>> {
    const rawFilters = _.omit(req.query, ["page", "limit", "with"]);
    const validFields = Object.keys(this.model.schema.paths);
    const filters = _.pick(rawFilters, validFields);
    const baseQuery = this.model.find(filters);
    return this.paginateResponse(req, baseQuery);
  }

  async paginateResponse(
    req: Request,
    baseQuery: Query<T[], any>
  ): Promise<PaginatedResult<T>> {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 20;
    const skip = (page - 1) * limit;

    let queryCount = baseQuery.clone().countDocuments();
    let query = baseQuery.skip(skip).limit(limit);

    if (typeof req.query.with === "string") {
      const relations = (req.query.with as string)
        .split(",")
        .map((r) => r.trim());
      for (const rel of relations) {
        query = query.populate(rel);
      }
    }

    const items = await query.exec();
    const total = await queryCount.exec();

    return {
      items: items as T[],
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async inactivate(id: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      id,
      { status: "INACTIVE" },
      { new: true }
    );
  }
}

export { BaseService, PaginatedResult };
