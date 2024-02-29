// lib/app.ts
import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/user";
import { AuthRoutes } from "./routes/auth";
import { BraceletRoutes } from "./routes/bracelet";

// import swaggerUi from "swagger-ui-express";
// import { swaggerDocs } from "./config/swaggerConfig"; // Import your Swagger configuration

class App {
  public app: express.Application;
  public routes: Routes = new Routes();
  public authRoutes: AuthRoutes = new AuthRoutes();
  public braceletRoutes: BraceletRoutes = new BraceletRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    this.authRoutes.routes(this.app);
    this.braceletRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }
}

export default new App().app;
