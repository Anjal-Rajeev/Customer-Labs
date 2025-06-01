import express from "express"
import chalk from "chalk"
import cors from "cors";
import logger from "morgan"
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";

import sequelize from "./database/index.js";

import indexRouter from "./routes.js";

const app = express();

import { error } from "express-error-catcher";
import notFound from "./middleware/notFound.js";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: true, credentials: true }));

app.use("/", indexRouter)

app.use(notFound)
app.use(error({log: "dev"}));


const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(chalk.blueBright(`Server listening on port ${PORT}`));
    });
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};

startServer();



export default app;