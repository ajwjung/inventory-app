const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getDrinks = asyncHandler(async(req, res, next) => {
  const allDrinks = await db.getAllDrinks();  
  res.json(allDrinks);  // Array of objects
});

// Get all drink types per category including same-name drinks
const getDrinksWithInfo = asyncHandler(async(req, res, next) => {
  const allDrinksWithCategory = await db.getDrinksWithInfo();  
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

const addNewDrink = asyncHandler(async(req, res, next) => {
  const { drink } = req.body;  
  await db.addNewDrink(drink);
});

const editDrinkType = asyncHandler(async(req, res, next) => {
  const { id, name } = req.body;
  await db.editDrinkType(id, name);
});

const editDrink = asyncHandler(async(req, res, next) => {
  const { id, drink } = req.body;
  console.log(drink);
  
  await db.editDrink(id, drink);
});

const deleteDrinkType = asyncHandler(async(req, res, next) => {
  const { id } = req.body;
  await db.deleteDrinkType(id);
});

const getAllMilkSubstitutes = asyncHandler(async(req, res, next) => {
  const allMilkSubstitutes = await db.getAllMilkSubstitutes();
  res.json(allMilkSubstitutes);
})

module.exports = {
  getDrinks,
  getDrinksWithInfo,
  getAllDrinkTypes,
  addNewDrinkType,
  addNewDrink,
  editDrinkType,
  editDrink,
  deleteDrinkType,
  getAllMilkSubstitutes,
}
