import { UpdateOptions } from "sequelize";
import { Request, Response } from "express";
import { Bracelet } from "../models/Bracelet";
import { ErrorResponde } from "../types/ErrorResponse";
import { Status } from "../enums/status";
import { User } from "../models/User";

export class BraceletController {
  public async index(req: Request, res: Response) {
    Bracelet.findAll<Bracelet>({})
      .then((bracelets: Array<Bracelet>) => res.json(bracelets))
      .catch((err) => res.status(400).json(err));
  }

  public async create(req: Request, res: Response) {
    const params: Bracelet = req.body;

    const already_exist_device_id = await Bracelet.findOne({
      where: {
        device_id: params.device_id,
      },
    });

    if (already_exist_device_id) {
      return res.status(Status.BAD_REQUEST).json({
        errors: "Bracelet with this device_id already exist",
      });
    }

    const already_exist_device_with_this_user_id = await Bracelet.findOne({
      where: {
        user_id: params.user_id,
      },
    });

    if (already_exist_device_with_this_user_id) {
      return res.status(Status.BAD_REQUEST).json({
        errors: "Bracelet with this user_id already exist",
      });
    }

    const non_user_found_with_this_user_id = await User.findOne({
      where: {
        id: params.user_id,
      },
    });

    if (!non_user_found_with_this_user_id) {
      return res.status(Status.BAD_REQUEST).json({
        errors: "User not found",
      });
    }

    const bracelet = await Bracelet.create<Bracelet>({
      device_id: params.device_id,
      user_id: params.user_id,
    })
      .then((bracelet) => res.status(Status.CREATED).json(bracelet))
      .catch((err: ErrorResponde) =>
        res
          .status(Status.INTERNAL_SERVER_ERROR)
          .json({ name: err.name, errors: err.message })
      );
  }

  public async show(req: Request, res: Response) {
    const BraceletId: number = Number(req.params.id);

    Bracelet.findByPk<Bracelet>(BraceletId)
      .then((bracelet: Bracelet | null) => {
        if (bracelet) {
          res.json({ message: bracelet });
        } else {
          res.status(Status.NOT_FOUND).json({ error: "bracelet not found" });
        }
      })
      .catch((err) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err })
      );
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
          res.status(Status.ACCEPTED).json({ message: "success" });
        } else {
          res.status(Status.NOT_FOUND).json({ message: "bracelet not found" });
        }
      })
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
  }
}
