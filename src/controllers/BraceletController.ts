// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import { UpdateOptions } from "sequelize";
import { Bracelet } from "../models/Bracelet";
import { IBracelet } from "../types/Bracelet";

export class BraceletController {
  public async index(req: Request, res: Response) {
    Bracelet.findAll<Bracelet>({})
      .then((bracelets: Array<Bracelet>) => res.json(bracelets))
      .catch((err) => res.status(500).json(err));
  }

  public async create(req: Request, res: Response) {
    const params: IBracelet = req.body;
    try {
      const newUser = await User.create<User>({
        // name: params.name,
        // email: params.email,
        // password: params.password,
      });

      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Ooops! We´re in trouble", message: { err } });
    }
  }

  public async show(req: Request, res: Response) {
    const BraceletId: number = Number(req.params.id);
    Bracelet.findByPk<Bracelet>(BraceletId)
      .then((bracelet: Bracelet | null) => {
        if (bracelet) {
          res.json(bracelet);
        } else {
          res.status(404).json({ error: "bracelet not found" });
        }
      })
      .catch((err) => res.status(500).json({ error: err }));
  }

  public async update(req: Request, res: Response) {
    const BraceletId = req.params.id;
    const params: IBracelet = req.body;

    const update: UpdateOptions = {
      where: {
        id: BraceletId,
      },
      limit: 1,
    };

    Bracelet.update(params, update)
      .then(() => res.status(202).json({ message: "success" }))
      .catch((err: Error) => res.status(500).json({ message: err.message }));
  }

  public async destroy(req: Request, res: Response) {
    const BraceletId = req.params.id;

    const options: UpdateOptions = {
      where: {
        id: BraceletId,
      },
      limit: 1,
    };

    Bracelet.destroy(options)
      .then(() => res.status(204).json({ message: "success" }))
      .catch((err: Error) => res.status(500).json({ message: err.message }));
  }
}
