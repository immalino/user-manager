import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

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

serve(
  {
    fetch: app.fetch,
    port: env.PORT || 3000,
  },
  (info) => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
