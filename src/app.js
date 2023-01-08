const express = require("express");
require("./config");
const pool = require("./db");
const app = express();
const empleadosRoutes = require("./routes/empleados_routes");
const indexRoutes = require("./routes/index.routes");
// create the connection to database
app.use(express.json());
app.use("/api", empleadosRoutes);
app.use(indexRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    message: "Ruta no encontrada",
  });
});

module.exports = {
  app,
};
