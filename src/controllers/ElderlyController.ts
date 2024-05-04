import { Request, Response } from "express";
import { User } from "../models/User";
import { Error, UpdateOptions } from "sequelize";

import { roles } from "../enums/roles";
import { Status } from "../enums/status";
import { Bracelet } from "../models/Bracelet";
import { UserRelative } from "../models/UserRelative";

export class ElderlyController {
  public async index(req: Request, res: Response) {
    User.findAll<User>({
      where: {
        role_id: roles.elderly,
      },
    })
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
  }

  public async create(req: Request, res: Response) {
    const params: User = req.body;

    const already_exist_phone_number = await User.findOne({
      where: {
        phone: params.phone,
      },
    });

    if (already_exist_phone_number) {
      return res.status(Status.BAD_REQUEST).json({
        errors: "Elderly with this phone number already exist",
      });
    }

    if (params.role_id != roles.elderly) {
      return res
        .status(Status.BAD_REQUEST)
        .json({ message: "Invalid role for elderly" });
    }

    try {
      const newUser = await User.create<User>({
        name: params.name,
        email: params.email,
        password: params.password,
        phone: params.phone,
        role_id: params.role_id,
      });

      return res.status(Status.CREATED).json(newUser);
    } catch (err) {
      return res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const bracelet = await Bracelet.findOne<Bracelet>({
      where: {
        user_id: id,
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
    }1

    return res.status(Status.OK).json({
      user: user,
      bracelet: bracelet ?? "No Bracelet yet",
    });
  }

  public async getRelatives(req: Request, res: Response) {
    let users: any[] = [];
    const { id } = req.params;
    const user_relatives = UserRelative.findAll<UserRelative>({
      where: {
        user_relative_id: id,
      },
    });
    for(var d in user_relatives){
      users.push(d);
    }
    return res.json({ message: users });
  }
}
