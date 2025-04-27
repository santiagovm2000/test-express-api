import { IUser, User } from "../models/user.model";
import { BaseService } from "./base.service";

/**
 * Service class for managing users.
 * Extends the BaseService to provide common CRUD operations for the User model.
 */
class UserService extends BaseService<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserService();
