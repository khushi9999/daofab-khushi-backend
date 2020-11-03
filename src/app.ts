import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { router } from "./router";
// Create Express server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 *  Production is served
 */
if (process.env.NODE_ENV === "production") {
  console.info("[App][Bootstrap] App is running in production mode.");
  app.enable("trust proxy");
  app.use("/", router);
} else {
  console.info("[App][Bootstrap] App is running in dev mode.");
  app.use(cors());
  app.use("/", router);
}

app.use((err, req, res, next) => {
  if (err) {
    console.error(
      `[App][Bootstrap] Uncaught error: ${err.message || err} stack: ${
        err.stack
      }`
    );
    res.status(401).json({ err: err.message || err });
  } else {
    res.status(401).json({ err });
  }
});

// export default server;
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.info(`[App][Bootstrap] App listening on port ${PORT}`);
  console.info("[App][Bootstrap] Press Ctrl+C to quit.");
});
