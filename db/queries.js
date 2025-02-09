const pool = require("./pool");

async function getAllDrinkTypes() {
  const { rows } = await pool.query("SELECT * FROM drink_types");
  return rows;
};

async function getAllDrinks() {
  const { rows } = await pool.query("SELECT * FROM drinks");
  return rows;
};

async function getAllMilkSubstitutes() {
  const { rows } = await pool.query("SELECT * FROM milk_substitutes");
  return rows;
}

module.exports = {
  getAllDrinkTypes,
  getAllDrinks,
  getAllMilkSubstitutes
}