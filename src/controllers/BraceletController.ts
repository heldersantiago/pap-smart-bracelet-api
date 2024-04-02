import { UpdateOptions } from "sequelize";
import { Request, Response } from "express";
import { Bracelet } from "../models/Bracelet";
import { ErrorResponde } from "../types/ErrorResponse";

export class BraceletController {
  public async index(req: Request, res: Response) {
    Bracelet.findAll<Bracelet>({})
      .then((bracelets: Array<Bracelet>) => res.json(bracelets))
      .catch((err) => res.status(400).json(err));
  }

  public async create(req: Request, res: Response) {
    const params: Bracelet = req.body;
    const bracelet = await Bracelet.create<Bracelet>({
      device_id: params.device_id,
      user_id: params.user_id,
    })
      .then((bracelet) => res.status(201).json(bracelet))
      .catch((err: ErrorResponde) =>
        res.status(400).json({ name: err.name, errors: err.message })
      );
  }

  public async show(req: Request, res: Response) {
    const BraceletId: number = Number(req.params.id);

    Bracelet.findByPk<Bracelet>(BraceletId)
      .then((bracelet: Bracelet | null) => {
        if (bracelet) {
          res.json({ message: bracelet });
        } else {
          res.status(404).json({ error: "bracelet not found" });
        }
      })
      .catch((err) => res.status(400).json({ errors: err }));
  }

  public async update(req: Request, res: Response) {
    const BraceletId = req.params.id;
    const params: Bracelet = req.body;

    const update: UpdateOptions = {
      where: {
        id: BraceletId,
      },
      limit: 1,
    };

    Bracelet.update(params, update)
      .then((bracelet) => {
        if (Number(bracelet) > 0) {
          res.status(202).json({ message: "success" });
        } else {
          res.status(404).json({ message: "bracelet not found" });
        }
      })
      .catch((err: Error) => res.status(500).json({ message: err.message }));
  }
}
