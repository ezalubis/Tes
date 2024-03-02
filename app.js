const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./src/routes/authRoutes.js");
const bannerRoutes = require("./src/routes/bannerRoutes.js");
const serviceRoutes = require("./src/routes/serviceRoutes.js");
const transactionRoutes = require("./src/routes/transactionRoutes.js");
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./apidocs.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use("", authRoutes);
app.use("", bannerRoutes);
app.use("", serviceRoutes);
app.use("", transactionRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log("gasss");
});
