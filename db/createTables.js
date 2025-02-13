#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");
const db = require("./queries");

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS drink_types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
  );

  CREATE TABLE IF NOT EXISTS milk_substitutes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    alternative VARCHAR ( 255 ),
    price NUMERIC(10, 2)
  );

  CREATE TABLE IF NOT EXISTS drinks (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    drink_type INTEGER REFERENCES drink_types(id),
    milk_substitute INTEGER REFERENCES milk_substitutes(id),
    price NUMERIC(10, 2)
  );
`;

const insertMilkSql = `
  INSERT INTO milk_substitutes (alternative, price)
  VALUES ('Oat Milk', 0.75),
      ('Almond Milk', 0.75),
      ('Soy Milk', 1.00);
`;

const insertDrinkTypesSql = `
  INSERT INTO drink_types (name)
  VALUES 
    ('Milk Tea'),
    ('Fruit Tea'),
    ('Hot Tea'),
    ('Seasonal Specialties');
`;

const insertDrinksSql = `
  INSERT INTO drinks (name, drink_type, milk_substitute, price)
  VALUES
    ('Jasmine Milk Tea', 1, 1, 4.50),
    ('Jasmine Milk Tea', 1, 2, 4.50),
    ('Jasmine Milk Tea', 1, 3, 4.50),
    ('Jasmine Milk Tea', 1, NULL, 4.50),
    ('Matcha Milk Tea', 1, 1, 5.00),
    ('Matcha Milk Tea', 1, 2, 5.00),
    ('Matcha Milk Tea', 1, 3, 5.00),
    ('Matcha Milk Tea', 1, NULL, 5.00),
    ('Iced Matcha Latte', 1, 1, 5.25),
    ('Iced Matcha Latte', 1, 2, 5.25),
    ('Iced Matcha Latte', 1, 3, 5.25),
    ('Iced Matcha Latte', 1, NULL, 5.25),
    ('Brown Sugar Milk Tea', 1, 1, 4.75),
    ('Brown Sugar Milk Tea', 1, 2, 4.75),
    ('Brown Sugar Milk Tea', 1, 3, 4.75),
    ('Brown Sugar Milk Tea', 1, NULL, 4.75),
    ('Taro Milk Tea', 1, 1, 4.60),
    ('Taro Milk Tea', 1, 2, 4.60),
    ('Taro Milk Tea', 1, 3, 4.60),
    ('Taro Milk Tea', 1, NULL, 4.60),
    ('Rose Milk Tea', 1, 1, 4.80),
    ('Rose Milk Tea', 1, 2, 4.80),
    ('Rose Milk Tea', 1, 3, 4.80),
    ('Rose Milk Tea', 1, NULL, 4.80),
    ('Black Sesame Milk Tea', 1, 1, 5.00),
    ('Black Sesame Milk Tea', 1, 2, 5.00),
    ('Black Sesame Milk Tea', 1, 3, 5.00),
    ('Black Sesame Milk Tea', 1, NULL, 5.00),
    ('Peach Oolong Tea', 2, NULL, 3.50),
    ('Mango Fruit Tea', 2, NULL, 3.75),
    ('Iced Fruit Tea', 2, NULL, 3.25),
    ('Lychee Fruit Tea', 2, NULL, 3.95),
    ('Green Tea', 3, NULL, 2.75),
    ('Black Tea', 3, NULL, 2.50),
    ('Honey Lemon Tea', 3, NULL, 3.00),
    ('Osmanthus Oolong Tea', 3, NULL, 3.00),
    ('Iron Goddess Tea', 3, NULL, 3.00),
    ('Iced Lavender Lemonade', 4, NULL, 4.00),
    ('Winter Seasonal Special', 4, NULL, 6.00),
    ('Mango Coconut Smoothie', 4, NULL, 6.00);
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_URI,
  });
  await client.connect();
  await client.query(createTablesQuery);
  
  // Populate tables with initial data
  // The number of rows to check against is the number of records we want to keep
  // that cannot be deleted
  const milkSubstituteData = await db.getAllMilkSubstitutes();
  if (milkSubstituteData.length < 3) {
    console.log("Adding data to `milk_substitutes` table...");
    await client.query(insertMilkSql);
  };

  const drinkTypesData = await db.getAllDrinkTypes();
  if (drinkTypesData.length < 4) {
    console.log("Adding data to `drink_types` table...");
    await client.query(insertDrinkTypesSql);
  };

  const drinksData = await db.getAllDrinks();
  if (drinksData.length < 40) {
    console.log("Adding data to `drinks` table...");
    await client.query(insertDrinksSql);
  }

  await client.end();
  console.log("Done!");
};

// async function main() {
//   console.log("Seeding...");
//   const client = new Client({
//     connectionString: process.env.CONNECTION_URI,
//   });
//   await client.connect();
//   await client.query(`DROP TABLE IF EXISTS drinks;`);
//   await client.query(`DROP TABLE IF EXISTS drink_types;`);
//   await client.query(`DROP TABLE IF EXISTS milk_substitutes;`);

//   await client.end();
//   console.log("Done!");
// };

main();