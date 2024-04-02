import { Request, Response } from "express";
import { User } from "../models/User";
import { Status } from "../enums/status";
import { roles } from "../enums/roles";
import { UserRelative } from "../models/UserRelative";
import { UserPayload } from "../types/userPayload";

export class RelativeController {
  public async create(req: Request, res: Response) {
    const user_params: User = req.body;
    const relative_params: UserPayload = req.body.user;

    const already_exist_phone_number = await User.findOne({
      where: {
        phone: user_params.phone,
      },
    });

    if (already_exist_phone_number) {
      return res.status(Status.BAD_REQUEST).json({
        errors: "Elderly with this phone number already exist",
      });
    }

    if (user_params.role_id != roles.elderly) {
      return res
        .status(Status.BAD_REQUEST)
        .json({ message: "Invalid role for elderly" });
    }

    try {
      const newUser = await User.create<User>({
        name: user_params.name,
        email: user_params.email,
        password: user_params.password,
        phone: user_params.phone,
        role_id: user_params.role_id,
      });

      const newUserRelative = await UserRelative.create<UserRelative>({
        user_id: newUser.id,
        user_relative_id: relative_params.id,
      });

      return res
        .status(Status.CREATED)
        .json({ user: newUser, relative: newUserRelative });
    } catch (err) {
      return res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err });
    }
  }
}
