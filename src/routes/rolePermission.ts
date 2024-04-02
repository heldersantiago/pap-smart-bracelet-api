import { AuthController } from "../controllers/AuthController";
import { RolePermissionController } from "../controllers/RolePermissionController";

export class RolePermissionRoutes {
  private readonly apiUrl: string = "/api/v1/";
  public rolePermissionController: RolePermissionController =
    new RolePermissionController();

  public routes(app: any): void {
    app
      .route(this.apiUrl + "permissions")
      .get(this.rolePermissionController.listPermissions);
    app
      .route(this.apiUrl + "roles")
      .get(this.rolePermissionController.listRoles);
  }
}
