import { BraceletController } from "../controllers/BraceletController";

export class BraceletRoutes {
  public braceletController: BraceletController = new BraceletController();

  public routes(app: any): void {
    app
      .route("/bracelets")
      .get(this.braceletController.index)
      .post(this.braceletController.create);

    app
      .route("/bracelets/:id")
      .get(this.braceletController.show)
      .post(this.braceletController.update)
      .delete(this.braceletController.destroy);
  }
}
