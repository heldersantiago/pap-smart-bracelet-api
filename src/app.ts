import express from "express";
import * as bodyParser from "body-parser";
import { ElderlyRoutes } from "./routes/elderly";
import { AuthRoutes } from "./routes/auth";
import { BraceletRoutes } from "./routes/bracelet";
import { RelativeRoutes } from "./routes/relative";
import { RolePermissionRoutes } from "./routes/rolePermission";
import { UserRoutes } from "./routes/user";
import { AlertRoutes } from "./routes/alerts";

class App {
  public app: express.Application;
  public elderlyRoutes: ElderlyRoutes = new ElderlyRoutes();
  public authRoutes: AuthRoutes = new AuthRoutes();
  public userRoutes: UserRoutes = new UserRoutes();
  public alertRoutes: AlertRoutes = new AlertRoutes();
  public braceletRoutes: BraceletRoutes = new BraceletRoutes();
  public relativesRoutes: RelativeRoutes = new RelativeRoutes();
  public rolesPermissionsRoutes: RolePermissionRoutes =
    new RolePermissionRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.elderlyRoutes.routes(this.app);
    this.authRoutes.routes(this.app);
    this.braceletRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.alertRoutes.routes(this.app);
    this.relativesRoutes.routes(this.app);
    this.rolesPermissionsRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
