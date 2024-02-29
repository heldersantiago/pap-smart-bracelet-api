import { UserController } from "../controllers/UserController";
import authorize from "../middlewares/authorize";
import { BraceletController } from "../controllers/BraceletController";

export class Routes {
  private readonly apiUrl: string = "/api/v1/users";
  public userController: UserController = new UserController();
  public braceletController: BraceletController = new BraceletController();

  public routes(app: any): void {
    app
      .route(this.apiUrl)
      .get(authorize, this.userController.index)
      .post(this.userController.create);
    app
      .route(this.apiUrl + "/:id")
      .get(this.userController.show)
      .put(this.userController.update)
      .delete(this.userController.destroy);
  }
}
