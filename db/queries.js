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

async function addNewDrinkType(drinkType) {
  const SQL = `
    INSERT INTO drink_types (name)
    VALUES ($1)
  `;

  await pool.query(SQL, [drinkType]);
};

async function editDrinkType(drinkTypeId, drinkTypeName) {  
  const SQL = `
    UPDATE drink_types
    SET name = $2
    WHERE id = $1;
  `;

  await pool.query(SQL, [parseInt(drinkTypeId), drinkTypeName])
};

async function deleteDrinkType(drinkTypeId) {
  // Do not allow deletion of first 4 entries (default categories)
  const SQL = `
    DELETE FROM drink_types
    WHERE id = $1 AND $1 > 4;
  `;

  await pool.query(SQL, [drinkTypeId]);
};

module.exports = {
  getAllDrinkTypes,
  getAllDrinks,
  getAllMilkSubstitutes,
  getDrinksPerType,
  addNewDrinkType,
  editDrinkType,
  deleteDrinkType,
}