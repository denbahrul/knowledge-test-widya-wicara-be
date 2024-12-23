const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
});

const doc = {
  info: {
    title: "Tech Space",
    description: "API Documentation for Tech Space (WIdya Wicara Knowledge Test)",
  },
  servers: [{ url: "localhost:3000" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    "@schemas": {
      registerSchema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          gender: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      loginSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        },
      },
      updateUserSchema: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          gender: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          profilePhoto: {
            type: "string",
            format: "binary",
          },
        },
      },
      createProductSchema: {
        type: "object",
        properties: {
          productName: {
            type: "string",
          },
          description: {
            type: "string",
          },
          productImage: {
            type: "string",
            format: "binary",
          },
        },
      },
      updateProductSchema: {
        type: "object",
        properties: {
          productName: {
            type: "string",
          },
          description: {
            type: "string",
          },
          productImage: {
            type: "string",
            format: "binary",
          },
        },
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
