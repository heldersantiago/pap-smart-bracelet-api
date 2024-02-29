// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import { IUser } from "../types/User";
import { Error, UpdateOptions } from "sequelize";
import { ErrorResponde } from "../types/ErrorResponse";

export class UserController {
  public async index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err: Error) => res.status(500).json(err.message));
  }

  public async create(req: Request, res: Response) {
    const params: IUser = req.body;
    const newUser: any = await User.create<User>({
      name: params.name,
      email: params.email,
      password: params.password,
      bracelet_id: params.bracelet_id,
      relative_tie: params.relative_tie,
    })
      .then((user) => res.status(201).json(user))
      .catch((err: ErrorResponde) =>
        res.status(500).json({ name: err.name, errors: err.message })
      );
  }

  public async show(req: Request, res: Response) {
    const UserId: number = Number(req.params.id);
    User.findByPk<User>(UserId)
      .then((user: User | null) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "user not found" });
        }
      })
      .catch((err: ErrorResponde) =>
        res.status(500).json({ name: err.name, error: err.message })
      );
  }

  public async update(req: Request, res: Response) {
    const UserId = req.params.id;
    const params: IUser = req.body;

    const update: UpdateOptions = {
      where: {
        id: UserId,
      },
      limit: 1,
    };

    User.update(params, update)
      .then(() => res.status(202).json({ message: "success" }))
      .catch((err: Error) => res.status(500).json({ message: err.message }));
  }

  public async destroy(req: Request, res: Response) {
    const UserId = req.params.id;

    const options: UpdateOptions = {
      where: {
        id: UserId,
      },
      limit: 1,
    };

    User.destroy(options)
      .then(() => res.status(204).json({ message: "success" }))
      .catch((err: Error) => res.status(500).json({ message: err.message }));
  }
}
