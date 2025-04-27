import { Request } from "express";
import _ from "lodash";
import { Model, Query } from "mongoose";

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

/**
 * Abstract base service class providing common CRUD operations for models.
 */
abstract class BaseService<T> {
  constructor(private model: Model<T>) {}

  /**
   * Creates a new entity in the database.
   *
   * @param data - Partial data for the entity to be created.
   * @returns A promise that resolves to the created entity.
   */
  async create(data: Partial<T>): Promise<T> {
    const entity = new this.model(data);
    const savedEntity = await entity.save();
    return savedEntity.toObject() as T;
  }

  /**
   * Retrieves a paginated list of entities based on request query parameters.
   *
   * @param req - The HTTP request object containing query parameters for filtering, pagination, and relations.
   * @returns A promise that resolves to a paginated result containing the entities.
   */
  async get(req: Request): Promise<PaginatedResult<T>> {
    const rawFilters = _.omit(req.query, ["page", "limit", "with"]);
    const validFields = Object.keys(this.model.schema.paths);
    const filters = _.pick(rawFilters, validFields);
    const baseQuery = this.model.find(filters);
    return this.paginateResponse(req, baseQuery);
  }

  /**
   * Paginates a query result based on request query parameters.
   *
   * @param req - The HTTP request object containing pagination and relation parameters.
   * @param baseQuery - The base Mongoose query to be paginated.
   * @returns A promise that resolves to a paginated result containing the entities.
   */
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

    // Check if the request has a "with" query parameter for populating relations
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

  /**
   * Retrieves an entity by its ID.
   *
   * @param id - The ID of the entity to retrieve.
   * @returns A promise that resolves to the entity if found, or null if not found.
   */
  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  /**
   * Updates an entity by its ID.
   *
   * @param id - The ID of the entity to update.
   * @param data - Partial data to update the entity with.
   * @returns A promise that resolves to the updated entity if found, or null if not found.
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Deletes an entity by its ID.
   *
   * @param id - The ID of the entity to delete.
   * @returns A promise that resolves to the deleted entity if found, or null if not found.
   */
  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  /**
   * Inactivates an entity by its ID by setting its status to "INACTIVE".
   *
   * @param id - The ID of the entity to inactivate.
   * @returns A promise that resolves to the inactivated entity if found, or null if not found.
   */
  async inactivate(id: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      id,
      { status: "INACTIVE" },
      { new: true }
    );
  }

  /**
   * Activates an entity by its ID by setting its status to "ACTIVE".
   *
   * @param id - The ID of the entity to activate.
   * @returns A promise that resolves to the activated entity if found, or null if not found.
   */
  async activate(id: string): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      id,
      { status: "ACTIVE" },
      { new: true }
    );
  }
}

export { BaseService, PaginatedResult };
