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

// Get all drinks with their type WITH dupes (render `AllDrinks.jsx`)
async function getDrinksWithInfo() {
  const SQL = `
    SELECT drinks.id AS id,
           drinks.name AS name,
           COALESCE(drink_types.name, 'No Type') AS drink_type,
           drinks.milk_substitute AS milk_substitute,
           drinks.price AS price
    FROM drinks
    LEFT JOIN drink_types
    ON drinks.drink_type = drink_types.id
    LEFT JOIN milk_substitutes
    ON drinks.milk_substitute = milk_substitutes.id;
  `;
  const { rows } = await pool.query(SQL);
  return rows;
}

async function addNewDrinkType(drinkType) {
  const SQL = `
    INSERT INTO drink_types (name)
    VALUES ($1)
  `;

  await pool.query(SQL, [drinkType]);
};

async function addNewDrink(newDrink) {
  const SQL = `
    INSERT INTO drinks (name, drink_type, milk_substitute, price)
    VALUES ($1, $2, $3, $4);
  `;

  await pool.query(SQL, [
    newDrink.drinkName, 
    newDrink.drinkType, 
    newDrink.milkSubstitute,
    newDrink.price
  ]);
};

async function editDrinkType(drinkTypeId, drinkTypeName) {  
  const SQL = `
    UPDATE drink_types
    SET name = $2
    WHERE id = $1;
  `;

  await pool.query(SQL, [parseInt(drinkTypeId), drinkTypeName])
};

async function editDrink(drinkId, drink) {
  const SQL = `
    UPDATE drinks
    SET name = $2, drink_type = $3, milk_substitute = $4, price = $5
    WHERE id = $1;
  `;

  await pool.query(SQL, [
    parseInt(drinkId),
    drink.drinkName,
    drink.drinkType,
    drink.milkSubstitute,
    drink.price
  ])
};

async function deleteDrinkType(drinkTypeId) {
  // Do not allow deletion of first 4 entries (default categories)
  const SQL = `
    DELETE FROM drink_types
    WHERE id = $1 AND $1 > 4;
  `;

  await pool.query(SQL, [drinkTypeId]);
};

async function deleteDrink(drinkId) {
  // Do not allow deletion of first 40 entries (default categories)
  const SQL = `
    DELETE FROM drinks
    WHERE id = $1 AND $1 > 40;
  `;

  await pool.query(SQL, [drinkId]);
}

module.exports = {
  getAllDrinkTypes,
  getDrinksWithInfo,
  getAllDrinks,
  getAllMilkSubstitutes,
  addNewDrinkType,
  addNewDrink,
  editDrinkType,
  editDrink,
  deleteDrinkType,
  deleteDrink,
}