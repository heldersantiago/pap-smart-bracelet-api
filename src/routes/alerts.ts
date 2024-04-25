import { AlertController } from "../controllers/AlertController";

export class AlertRoutes {
  private readonly apiUrl: string = "/api/v1/alerts";
  public alertController: AlertController = new AlertController();

  public routes(app: any): void {
    app.route(this.apiUrl).get(this.alertController.index);
    app.route(this.apiUrl + "/:bracelet_id").get(this.alertController.getAlertByBracelet);
    app.route(this.apiUrl + "/:id").put(this.alertController.update);
  }
}
