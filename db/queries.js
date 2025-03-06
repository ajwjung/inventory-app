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

// Original query to get drinks per type WITHOUT dupes (render `AllDrinks.jsx`)
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

// New query to get all drinks with their type WITH dupes (render `AllDrinks.jsx`)
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
}

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
  getDrinksWithInfo,
  getAllDrinks,
  getAllMilkSubstitutes,
  getDrinksPerType,
  addNewDrinkType,
  addNewDrink,
  editDrinkType,
  deleteDrinkType,
}