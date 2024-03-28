import { ElderlyController } from "../controllers/ElderlyController";
import authorize from "../middlewares/authorize";
import { BraceletController } from "../controllers/BraceletController";

export class ElderlyRoutes {
  private readonly apiUrl: string = "/api/v1/users/elderlies";
  public elderlyController: ElderlyController = new ElderlyController();
  public braceletController: BraceletController = new BraceletController();

  public routes(app: any): void {
    app
      .route(this.apiUrl)
      .get(this.elderlyController.index)
      .post(this.elderlyController.create);
    app.route(this.apiUrl + "/:id").get(this.elderlyController.show);
  }
}
