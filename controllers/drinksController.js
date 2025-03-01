const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getDrinks = asyncHandler(async(req, res, next) => {
  const allDrinks = await db.getAllDrinks();  
  res.json(allDrinks);  // Array of objects
});

// Original controller for getting all drink types per category
// EXCLUDES DUPLICATE DRINK NAMES
const getDrinksPerType = asyncHandler(async(req, res, next) => {
  const allDrinksPerType = await db.getDrinksPerType();  
  res.json(allDrinksPerType);  // Array of objects
});

// New controller for getting all drink types per category
// INCLUDES DUPLICATE DRINK NAMES
const getDrinksWithTypes = asyncHandler(async(req, res, next) => {
  const allDrinksWithCategory = await db.getDrinksWithTypes();  
  res.json(allDrinksWithCategory);  // Array of objects
});

const getAllDrinkTypes = asyncHandler(async(req, res, next) => {
  const allDrinkTypes = await db.getAllDrinkTypes();
  res.json(allDrinkTypes);
});

const addNewDrinkType = asyncHandler(async(req, res, next) => {
  const { name } = req.body;  
  await db.addNewDrinkType(name);
});

const editDrinkType = asyncHandler(async(req, res, next) => {
  const { id, name } = req.body;
  await db.editDrinkType(id, name);
});

const deleteDrinkType = asyncHandler(async(req, res, next) => {
  const { id } = req.body;
  await db.deleteDrinkType(id);
});

module.exports = {
  getDrinks,
  getDrinksPerType,
  getDrinksWithTypes,
  getAllDrinkTypes,
  addNewDrinkType,
  editDrinkType,
  deleteDrinkType
}
