import type { OpenAPIHono } from "@hono/zod-openapi";

import { Scalar } from "@scalar/hono-api-reference";

import packageJSON from "../../package.json";

export default function configureOpenApi(app: OpenAPIHono) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "User Manager API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      url: "/api/v1/doc",
      title: "User Manager API Reference",
    }),
  );
}
