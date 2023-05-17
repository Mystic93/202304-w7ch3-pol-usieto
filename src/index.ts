import "./loadEnvironment.js";
import createDebug from "debug";
import mongoose from "mongoose";
import chalk from "chalk";
import app from "./server/index.js";

const debug = createDebug("item-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGO_DB_CONNECTION;

if (!mongoDbConnection) {
  debug(`${chalk.red("Missing enviroment variable. Exiting...")}`);
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});

try {
  await mongoose.connect(mongoDbConnection);

  debug(chalk.blue(`Connnected to database`));
} catch (error: unknown) {
  debug(`Error connectin to basedata: ${chalk.red((error as Error).message)}`);
}
