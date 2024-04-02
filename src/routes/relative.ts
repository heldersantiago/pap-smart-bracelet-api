import { BraceletController } from "../controllers/BraceletController";
import { RelativeController } from "../controllers/RelativeController";
import authorize from "../middlewares/authorize";

export class RelativeRoutes {
  private readonly apiUrl: string = "/api/v1/relatives";
  public relativeController: RelativeController = new RelativeController();

  public routes(app: any): void {
    app.route(this.apiUrl).post(authorize, this.relativeController.create);

    app.route(this.apiUrl + "/:id").put(this.relativeController.create);
  }
}
