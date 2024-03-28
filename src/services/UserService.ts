import { IUserService } from "../interfaces/IUserService";
import { User } from "../models/User";
import { IUser } from "../types/User";

export class UserService implements IUserService {
  public async createUser(user: IUser): Promise<IUser> {
    const newUser: User = await User.create<User>({ user });
    return newUser;
  }
  public async getUser(id: string): Promise<IUser | null> {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    return user;
  }
}
