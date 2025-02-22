const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getDrinks = asyncHandler(async(req, res, next) => {
  const allDrinks = await db.getAllDrinks();  
  res.json(allDrinks);  // Array of objects
});

const getDrinksPerType = asyncHandler(async(req, res, next) => {
  const allDrinksPerType = await db.getDrinksPerType();  
  res.json(allDrinksPerType);  // Array of objects
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
  getAllDrinkTypes,
  addNewDrinkType,
  editDrinkType,
  deleteDrinkType
}
