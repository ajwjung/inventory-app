const { Router } = require("express");
const drinksController = require("../controllers/drinksController.js");

const drinksRouter = Router();

drinksRouter.get("/all-items", drinksController.getDrinksWithInfo);
drinksRouter.put("/all-items", drinksController.editDrink);
drinksRouter.post("/all-items", drinksController.addNewDrink);
drinksRouter.delete("/all-items/:drinkId", drinksController.deleteDrink);

drinksRouter.get("/all-categories", drinksController.getAllDrinkTypes);
drinksRouter.post("/all-categories", drinksController.addNewDrinkType);
drinksRouter.put("/all-categories", drinksController.editDrinkType);
drinksRouter.delete("/all-categories/:categoryId", drinksController.deleteDrinkType);

drinksRouter.get("/all-milk-substitutes", drinksController.getAllMilkSubstitutes);

module.exports = drinksRouter;