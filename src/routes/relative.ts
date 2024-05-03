import { RelativeController } from "../controllers/RelativeController";
import authorize from "../middlewares/authorize";

export class RelativeRoutes {
  private readonly apiUrl: string = "/api/v1/users/relatives";
  public relativeController: RelativeController = new RelativeController();

  public routes(app: any): void {
    app.get(this.apiUrl + "/all", this.relativeController.index);
    app.route(this.apiUrl + "/:relative_id").post(this.relativeController.create);
    app.route(this.apiUrl + "/:id").get(this.relativeController.show);
  }
}
