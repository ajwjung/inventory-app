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
};

async function getDrinksPerType() {
  const SQL = `
    SELECT drink_types.id,
           COALESCE(drink_types.name, 'No Type') AS drink_type_name,
           drinks.name AS drink_name
    FROM drink_types
    LEFT JOIN drinks
    ON drink_types.id = drinks.drink_type
    GROUP BY drink_types.id, drink_types.name, drinks.name;
  `;
  const { rows } = await pool.query(SQL);
  return rows;
};

module.exports = {
  getAllDrinkTypes,
  getAllDrinks,
  getAllMilkSubstitutes,
  getDrinksPerType
}