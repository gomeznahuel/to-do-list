import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application, Request, Response  } from "express";

const swaggerOptions  = {
  definition: {
    openapi: "3.0.0",
    info: { title: "To-do APP", version: "1.0.0" },
  },
  apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions );

const setupSwaggerDocs  = (app: Application, port: number) => {
  app.use("/api/v1/docs", swaggerUi.serve);
  app.get("/api/v1/docs", swaggerUi.setup(swaggerSpec));

  app.get("/api/v1/docs.json", (req: Request, res: Response) => {
    res.setHeader("content-type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`API documentation is available at http://localhost:${port}/api/v1/docs`);
};

export { setupSwaggerDocs  };
