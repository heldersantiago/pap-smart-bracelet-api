import { Request, Response } from "express";
import { User } from "../models/User";
import { Error, UpdateOptions } from "sequelize";

import { Status } from "../enums/status";

export class UserController {
  public async index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

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
    });
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: User = req.body;

    const update: UpdateOptions = {
      where: {
        id,
      },
    };

    User.update(params, update)
      .then((user) => {
        if (!user)
          res.status(Status.NOT_FOUND).json({ message: "User not found" });
        return res.json({ message: "success" });
      })
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
  }
}
