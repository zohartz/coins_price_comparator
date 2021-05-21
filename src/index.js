const express = require("express");
const cors = require("cors");
const coinsRoute = require("./routes/coins");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const pathValidator = require("./middlewares/pathValidator");
require("dotenv").config();

const app = express();

// Enabling CORS
const corsHeaders = {
  origin: ["*"],
  methods: "GET,POST,OPTIONS,PUT,DELETE",
  preflightContinue: false,
  allowedHeaders: ["Content-Type", "Authorization", "Host", "X-Requested-With"],
  credentials: true,
};
app.use(cors(corsHeaders));

app.get("/test", (req, res) => {
  res.send("coins-price-comparator");
});

app.use(
  "/api/v1/coins",
  (req, res, next) => {
    pathValidator.validate(req, res, next);
  },
  coinsRoute
);

app.use(
  `/api/v1/management/swagger`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/*", (req, res) => {
  res.status(404).json({
    description: "Invalid endpoint - url does not exist",
    status: 404,
  });
});

app.listen(process.env.PORT, process.env.HOST);
console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);
