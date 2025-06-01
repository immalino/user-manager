import { OpenAPIHono } from "@hono/zod-openapi";

import notFound from "../middlewares/not-found";
import onError from "../middlewares/on-error";
import serveEmojiFavicon from "../middlewares/serve-emoji-favicon";
import defaultHook from "./default-hook";

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("🙏"));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
