import { BraceletController } from "../controllers/BraceletController";

export class BraceletRoutes {
  private readonly apiUrl: string = "/api/v1/bracelets";
  public braceletController: BraceletController = new BraceletController();

  public routes(app: any): void {
    app
      .route(this.apiUrl)
      .get(this.braceletController.index)
      .post(this.braceletController.create);

    app
      .route(this.apiUrl + "/:id")
      .get(this.braceletController.show)
      .put(this.braceletController.update)
      .delete(this.braceletController.destroy);
    app
      .route(this.apiUrl + "/users/:bracelet_id")
      .get(this.braceletController.getUsers);
  }
}
