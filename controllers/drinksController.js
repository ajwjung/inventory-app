const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const fetchDrinks = asyncHandler(async(req, res, next) => {
  const allDrinks = await db.getAllDrinks();  
  console.log(allDrinks);
  res.json(allDrinks);  // Array of objects
});

module.exports = {
  fetchDrinks
}
