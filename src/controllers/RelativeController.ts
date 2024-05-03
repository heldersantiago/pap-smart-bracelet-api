import { Request, Response } from "express";
import { User } from "../models/User";
import { Status } from "../enums/status";
import { roles } from "../enums/roles";
import { UserRelative } from "../models/UserRelative";
import { UserPayload } from "../types/userPayload";
import { Bracelet } from "../models/Bracelet";

export class RelativeController {
  public async index(req: Request, res: Response) {
    User.findAll<User>({
      where: {
        role_id: roles.relative,
      },
    })
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
  }

  public async create(req: Request, res: Response) {
    const user_params: User = req.body;
    const { relative_id } = req.params;

    const already_exist_phone_number = await User.findOne({
      where: {
        phone: user_params.phone,
      },
    });

    if (already_exist_phone_number) {
      return res.status(Status.BAD_REQUEST).json({
        errors: "relative with this phone number already exist",
      });
    }

    if (user_params.role_id != roles.relative) {
      return res
        .status(Status.BAD_REQUEST)
        .json({ message: "Invalid role for relative" });
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
        user_relative_id: relative_id,
      });

      return res
        .status(Status.CREATED)
        .json({ user: newUser, relative: newUserRelative });
    } catch (err) {
      return res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const elderly = await UserRelative.findOne<UserRelative>({
      where: {
        user_id: id,
      },
    });

    const bracelet = await Bracelet.findOne<Bracelet>({
      where: {
        user_id: elderly?.user_relative_id,
      },
    });

    const user = await User.findOne<User>({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(Status.NOT_FOUND).json({
        errors: "User not found",
      });
    }

    return res.status(Status.OK).json({
      user: user,
      bracelet: bracelet ?? "No Bracelet yet",
    });
  }
}
