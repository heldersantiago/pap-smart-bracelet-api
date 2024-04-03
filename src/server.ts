import * as dotenv from "dotenv";
import path = require("path");
import app from "./app";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";
import swaggerJSDoc = require("swagger-jsdoc");

// Setting up the environment
const envPATH = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPATH });

const PORT = Number(process.env.PORT) || 3001;

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => console.info(`API app listening on port ${PORT}!`));
