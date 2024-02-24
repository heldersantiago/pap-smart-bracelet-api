// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";
import { User } from "../models/user";
import { IUser } from "../types/User";

export class UserController {
  public async index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err) => res.status(500).json(err));
  }

  public async create(req: Request, res: Response) {
    const params: IUser = req.body;
    try {
      const newUser = await User.create<User>({
        name: params.name,
        email: params.email,
        password: params.password,
      });

      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: { err } });
    }
  }

  public async show(req: Request, res: Response) {
    const UserId: number = Number(req.params.id);
    User.findByPk<User>(UserId).then((user: User | null) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });
  }

  public async update(req: Request, res: Response) {
    const user = await User.findOne<User>({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  }

  public async destroy(req: Request, res: Response) {
    const user = await User.findOne<User>({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  }
}
