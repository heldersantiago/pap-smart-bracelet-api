// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import { Error, UpdateOptions } from "sequelize";
import { ErrorResponde } from "../types/ErrorResponse";

import { roles } from "../enums/roles";
import { Status } from "../enums/status";

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

    User.findOne<User>({
      where: {
        id,
      },
    })
      .then((user) => {
        if (!user)
          res.status(Status.NOT_FOUND).json({ message: "Elderly not found" });
        return res.json(user);
      })
      .catch((err: ErrorResponde) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
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
          res.status(Status.NOT_FOUND).json({ message: "Elderly not found" });
        return res.json(user);
      })
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ message: err.message })
      );
  }
}
