import { Request, Response } from "express";
import { UserController } from "../controllers/user";

export class Routes {
  public userController: UserController = new UserController();

  public routes(app: any): void {
    app
      .route("/users")
      .get(this.userController.index)
      .post(this.userController.create);
    app
      .route("/users/:id")
      .get(this.userController.show)
      .put(this.userController.update)
      .delete(this.userController.destroy);
  }
}
