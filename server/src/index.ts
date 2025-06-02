import { serve } from "@hono/node-server";

import env from "../env";
import configureOpenApi from "./libs/configure-open-api";
import createApp from "./libs/create-app";
import { userRouter } from "./users/user.routes";

const app = createApp().basePath("/api/v1");

configureOpenApi(app);

export const router = app.route("/users", userRouter);

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
