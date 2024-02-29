import { AuthController } from "../controllers/AuthController";

export class AuthRoutes {
  private readonly apiUrl: string = "/api/v1/auth/login";
  public authController: AuthController = new AuthController();

  public routes(app: any): void {
    app.route(this.apiUrl).post(this.authController.login);
  }
}
