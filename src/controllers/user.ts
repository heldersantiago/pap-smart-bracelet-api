// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";
import { User } from "../models/user";
import { IUser } from "../types/User";
import { UpdateOptions } from "sequelize";

export class UserController {
  /**
   * Returns a list of all users in the database.
   * @param req - The request object.
   * @param res - The response object.
   */
  public async index(req: Request, res: Response) {
    User.findAll<User>({})
      .then((users: Array<User>) => res.json(users))
      .catch((err) => res.status(500).json(err));
  }

  /**
   * Creates a new user in the database.
   * @param req - The request object.
   * @param res - The response object.
   */
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
        .json({ error: "Ooops! We´re in trouble", message: { err } });
    }
  }

  /**
   * Show an existing user in the database.
   * @param req - The request object.
   * @param res - The response object.
   */
  public async show(req: Request, res: Response) {
    const UserId: number = Number(req.params.id);
    User.findByPk<User>(UserId)
      .then((user: User | null) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  }

  /**
   * Updates an existing user in the database.
   * @param req - The request object.
   * @param res - The response object.
   */
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

  /**
   * Deletes an existing user in the database.
   * @param req - The request object.
   * @param res - The response object.
   */
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
