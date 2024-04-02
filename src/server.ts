import * as dotenv from "dotenv";
import path = require("path");
import app from "./app";

// Setting up the environment
const envPATH = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPATH });

const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
