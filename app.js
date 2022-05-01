import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import subredditRouter from "./routes/subreddits.js";
import authRouter from "./src/authApp/routes.js";
import commentRouter from "./src/commentApp/routes.js";
import {
  optionsToCustomizeSwagger,
  swaggerOptions,
} from "./src/configs/swagger.js";
import redditRouter from "./src/redditApp/routes.js";
import errorLogger from "./src/utils/errorLogger.js";
import responseHandler from "./src/utils/responseHandler.js";

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, optionsToCustomizeSwagger, { explorer: true })
);
app.use("/api/v1/accounts", authRouter);
app.use("/api/v1/reddits", redditRouter);
app.use("/api/v1/comments", commentRouter);

app.get("/", (req, res) => {
  if (req.accepts()[0] === "text/html") {
    return res.redirect("/docs");
  }
  return responseHandler(res, 200, "Welcome to reddit clone");
});
app.use("/api/v1/subreddits", subredditRouter);

app.all("*", (req, res) => {
  if (req.accepts()[0] === "text/html") {
    return res.redirect("/docs");
  }
  return responseHandler(res, 404, "Not found");
});

app.use(errorLogger);

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection success");
    app.listen(port, () => console.log("API running on port: ", port));
  })
  .catch((error) => console.log(error));