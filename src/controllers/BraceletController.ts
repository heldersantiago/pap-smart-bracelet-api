// lib/controllers/nodes.controller.ts
import { Request, Response } from "express";
import { UpdateOptions } from "sequelize";
import { Bracelet } from "../models/Bracelet";
import { IBracelet } from "../types/Bracelet";
import { ErrorResponde } from "../types/ErrorResponse";

export class BraceletController {
  public async index(req: Request, res: Response) {
    Bracelet.findAll<Bracelet>({})
      .then((bracelets: Array<Bracelet>) => res.json(bracelets))
      .catch((err) => res.status(400).json(err));
  }

  public async create(req: Request, res: Response) {
    const params: IBracelet = req.body;
    const bracelet = await Bracelet.create<Bracelet>({
      heart_rate: params.heart_rate,
      pressure: params.pressure,
    })
      .then((bracelet) => res.status(201).json(bracelet))
      .catch((err: ErrorResponde) =>
        res.status(400).json({ name: err.name, message: err.message })
      );
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
      .catch((err) => res.status(400).json({ error: err }));
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
      .then((bracelet) => {
        if (Number(bracelet) > 0) {
          res.status(202).json({ message: "success", bracelet: bracelet });
        } else {
          res.status(404).json({ message: "bracelet not found" });
        }
      })
      .catch((err: Error) => res.status(400).json({ message: err.message }));
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
      .then((bracelet) =>
        res.status(204).json({ message: "success", bracelet: bracelet })
      )
      .catch((err: Error) => res.status(400).json({ message: err.message }));
  }
}
