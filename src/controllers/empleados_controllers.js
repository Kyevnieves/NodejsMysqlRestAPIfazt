const pool = require("../db");

const obtenerEmpleado = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await (
      await pool
    ).query("SELECT * FROM empleados WHERE id = ?", [id]);
    rows.length <= 0
      ? res.status(404).json({ mensaje: "Empleado no encontrado" })
      : res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo fue mal",
    });
  }
};

const obtenerEmpleados = async (req, res) => {
  try {
    const [rows] = await (await pool).query("SELECT * FROM empleados");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo fue mal",
    });
  }
};

const crearEmpleado = async (req, res) => {
  const { nombre, salario } = req.body;
  try {
    const [rows] = await (
      await pool
    ).query("INSERT INTO empleados (nombre,salario) VALUES (?,?)", [
      nombre,
      salario,
    ]);
    res.send({
      id: rows.insertId,
      nombre,
      salario,
    });
  } catch (error) {
    console.log(error);
    res.end();
  }
};
const actualizarEmpleado = async (req, res, next) => {
  const { id } = req.params;
  const { nombre, salario } = req.body;
  let result = [];

  try {
    const [rows] = await (
      await pool
    ).query(
      "UPDATE empleados SET nombre = IFNULL(?, nombre), salario = IFNULL(?, salario) WHERE id = ?",
      [nombre, salario, id]
    );
    rows.affectedRows <= 0
      ? res.status(404).json({
          message: "Empleado no encontrado en la base de datos",
        })
      : ([result] = await (
          await pool
        ).query("SELECT * FROM empleados WHERE id = ?", [id]));
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo fue mal",
    });
  }
};
const eliminarEmpleado = async (req, res) => {
  const { id } = req.params;
  const result = await (
    await pool
  ).query("DELETE FROM empleados WHERE id = ?", [id]);
  result.affectedRows <= 0
    ? res.status(204)
    : res.status(404).json({
        message: "No se elimino ningun empleado",
      });
};

module.exports = {
  obtenerEmpleado,
  obtenerEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
};
