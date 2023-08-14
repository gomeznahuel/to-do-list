import express, { Application, json, urlencoded  } from "express";
import { dbConnection } from "./database";
import { router } from "./routes/task.route";
import { setupSwaggerDocs } from "./routes/swagger";

class App {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = 3000;
  }

  private configureApp(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
  }

  private async connectDB() {
    try {
      await dbConnection();
      console.log("Connected to database");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }

  private setRoutes(): void {
    this.app.use("/", router);
  }

  private startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

    setupSwaggerDocs(this.app, this.port);
  }

  public async start() {
    this.configureApp();
    this.setRoutes();
    await this.connectDB();
    this.startServer();
  }
}

export default App;
