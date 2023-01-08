const { Router } = require("express");
const {
  obtenerEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  obtenerEmpleado,
} = require("../controllers/empleados_controllers");
const router = Router();

router.get("/empleados", obtenerEmpleados);
router.get("/empleado/:id", obtenerEmpleado);
router.post("/empleados", crearEmpleado);
router.patch("/empleado/:id", actualizarEmpleado);
router.delete("/empleado/:id", eliminarEmpleado);
module.exports = router;
