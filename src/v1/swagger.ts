import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Cyclia Documentation",
      version: "1.0.0",
      description:
        "Bienvenido a la documentación de la API Cyclia. Esta exhaustiva guía proporciona una visión detallada de todos los aspectos de nuestra API, desde la autenticación hasta la gestión de mensajes y usuarios.Diseñada con la claridad y la accesibilidad en mente, nuestra documentación está estructurada de manera lógica y fácil de seguir, lo que permite a los desarrolladores encontrar rápidamente la información que necesitan para integrar y utilizar eficazmente nuestros servicios.",
    },
    servers: [
      {
        url: "http://localhost:84",
      },
    ],
  },
  apis: [
    "src/v1/routes/user/user.routes.ts",
    "src/v1/routes/message/message.routes.ts",
    "src/v1/routes/identity/identity.routes.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.info(
    "🔗 Swagger Documentation:",
    decodeURI(`\x1b[36mhttp://localhost:84/api/v1/docs\x1b[0m`),
  );
};
