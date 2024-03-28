// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import { Error, UpdateOptions } from "sequelize";
import { ErrorResponde } from "../types/ErrorResponse";

import { roles } from "../enums/roles";

export class ElderlyController {
  public async index(req: Request, res: Response) {
    User.findAll<User>({
      where: {
        role_id: roles.elderly,
      },
    })
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) => res.status(401).json({ errors: err.message }));
  }

  public async create(req: Request, res: Response) {
    const params: User = req.body;

    if (params.role_id != roles.elderly) {
      return res.status(401).json({ message: "Invalid role for elderly" });
    }

    const newUser: any = await User.create<User>({
      name: params.name,
      email: params.email,
      password: params.password,
      phone: params.phone,
      role_id: params.role_id,
    })
      .then((user) => res.status(201).json(user))
      .catch((err: ErrorResponde) =>
        res.status(400).json({ errors: err.message })
      );
  }

  public async show(req: Request, res: Response) {
    const UserId: number = Number(req.params.id);
    User.findByPk<User>(UserId)
      .then((user: User | null) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ errors: "user not found" });
        }
      })
      .catch((err: ErrorResponde) =>
        res.status(400).json({ errors: err.message })
      );
  }

  public async update(req: Request, res: Response) {
    const UserId = req.params.id;
    const params: User = req.body;

    const update: UpdateOptions = {
      where: {
        id: UserId,
      },
      limit: 1,
    };

    User.update(params, update)
      .then((user) => {
        if (Number(user) > 0) {
          res.status(202).json({ message: "success", user: user });
        } else {
          res.status(404).json({ errors: "User not found" });
        }
      })
      .catch((err: Error) => res.status(400).json({ errors: err.message }));
  }

  public async destroy(req: Request, res: Response) {
    const UserId = req.params.id;

    const options: UpdateOptions = {
      where: {
        id: UserId,
      },
    };

    User.destroy(options)
      .then(() => res.status(204).json({ message: "success" }))
      .catch((err: Error) => res.status(400).json({ errors: err.message }));
  }
}
