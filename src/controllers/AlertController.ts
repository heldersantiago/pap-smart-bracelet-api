import { Request, Response } from "express";
import { User } from "../models/User";
import { Error, UpdateOptions } from "sequelize";

import { Status } from "../enums/status";
import { Alert } from "../models/Alert";

export class AlertController {
  public async index(req: Request, res: Response) {
    Alert.findAll<Alert>({})
      .then((alerts: Array<Alert>) => res.json(alerts))
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
  }


  public async getAlertByBracelet(req: Request, res: Response) {
    Alert.findAll<Alert>({
      where: {
        braceletId: req.params.bracelet_id,
        isActive: true
      }
    })
      .then((alerts: Array<Alert>) => {
        if(!alerts) return res.status(Status.NO_CONTENT).json({ errors: "No alerts" });
        return res.status(Status.OK).json(alerts);
      })
      .catch((err: Error) =>
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

    Alert.update(params, update)
      .then((alert) => {
        if (!alert)
          res.status(Status.NOT_FOUND).json({ message: "alert not found" });
        return res.json({ message: "success" });
      })
      .catch((err: Error) =>
        res.status(Status.INTERNAL_SERVER_ERROR).json({ errors: err.message })
      );
  }
}
