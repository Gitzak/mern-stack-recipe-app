require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config/keys");
const { errorHandler } = require("./middleware/errorHandler");

const http = require("http");

const { connection } = require("./utils/database");
const database = connection();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
// Enable CORS with specific origin
const corsOptions = {
  origin: config.app.origin_front, // replace with the actual origin of your frontend
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", routes);

app.use(errorHandler);

database.connectToMongo();

app.listen(config.port, () => {
  console.log(`\x1b[33m Server is running on port ${config.port} \x1b[0m`);
});
