import { RelativeController } from "../controllers/RelativeController";
import authorize from "../middlewares/authorize";

export class RelativeRoutes {
  private readonly apiUrl: string = "/api/v1/users/relatives";
  public relativeController: RelativeController = new RelativeController();

  public routes(app: any): void {

    app.route(this.apiUrl).get(this.relativeController.index);
    app.route(this.apiUrl).post(authorize, this.relativeController.create);
  }
}
