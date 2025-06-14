import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import env from "../../env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
const database = drizzle({ client: pool });

export default database;
