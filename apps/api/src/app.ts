import express, { type Application } from "express";
import cors from "cors";
import morgan from "morgan";

import MongoDB from "./config/mongoDB-config.js";
import helmet from "./config/helmet-config.js";
import routes from "./routes.js";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configs();
    this.middlewares();
    this.routes();
  }

  private routes() {
    this.app.use("/", routes);
  }

  private middlewares() {
    this.app.set("trust proxy", 1);
    this.app.use(morgan(":method :url - INICIADA", { immediate: true }));
    this.app.use(morgan("dev"));
    this.app.use(helmet);
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN || "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      }),
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private async configs() {
    await MongoDB.connect();
  }
}

export default new App();
