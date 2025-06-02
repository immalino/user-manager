import { serveStatic } from "hono/bun";

import env from "../env";
import configureOpenApi from "./libs/configure-open-api";
import createApp from "./libs/create-app";
import { userRouter } from "./users/user.routes";

const app = createApp();

const apiApp = app.basePath("/api/v1");

configureOpenApi(apiApp);

apiApp.route("/users", userRouter);

app.get("*", serveStatic({ root: "./static/dist" }));
app.get("*", serveStatic({ path: "./static/dist/index.html" }));

export default {
  port: env.PORT || 3000,
  fetch: app.fetch,
};
