import { IUser, User } from "../models/user.model";
import { BaseService } from "./base.service";

class UserService extends BaseService<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserService();
