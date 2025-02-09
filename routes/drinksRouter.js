const { Router } = require("express");
const drinksController = require("../controllers/drinksController.js");

const drinksRouter = Router();

drinksRouter.get("/", (req, res) => {
  res.send("Hello, World!");
})
drinksRouter.get("/api/items", drinksController.fetchDrinks);

module.exports = drinksRouter;