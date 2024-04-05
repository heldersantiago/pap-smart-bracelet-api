import { SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SMSI API Documentation",
      description:
        "SMSI API Documentation is a Health Management Eldelies System",
      contact: {
        name: "nexus",
        email: "heldersantiago273@gmail.com",
      },
      version: "1",
    },
    servers: [
      {
        url: "http://localhost:3001/api/v1",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
  components: {
    schemas: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
