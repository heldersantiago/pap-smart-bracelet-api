import { AuthController } from "../controllers/authController";

export class AuthRoutes {
  public authController: AuthController = new AuthController();

  public routes(app: any): void {
    app.route("/login").post(this.authController.login);
  }
}
