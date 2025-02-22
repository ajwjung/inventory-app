const { Router } = require("express");
const drinksController = require("../controllers/drinksController.js");

const drinksRouter = Router();

drinksRouter.get("/", (req, res) => {
  res.send("Hello, World!");
})
drinksRouter.get("/api/items", drinksController.getDrinks);
drinksRouter.get("/api/items-per-category", drinksController.getDrinksPerType);
drinksRouter.get("/api/all-categories", drinksController.getAllDrinkTypes);
drinksRouter.post("/api/all-categories", drinksController.addNewDrinkType);
drinksRouter.put("/api/all-categories", drinksController.editDrinkType);
drinksRouter.delete("/api/all-categories/:categoryId", drinksController.deleteDrinkType);

module.exports = drinksRouter;