const { Router } = require("express");
const drinksController = require("../controllers/drinksController.js");

const drinksRouter = Router();

drinksRouter.get("/", (req, res) => {
  res.send("Hello, World!");
})

drinksRouter.get("/api/all-items", drinksController.getDrinksWithInfo);
drinksRouter.put("/api/all-items", drinksController.editDrink);
drinksRouter.post("/api/all-items", drinksController.addNewDrink);
drinksRouter.get("/api/all-categories", drinksController.getAllDrinkTypes);
drinksRouter.post("/api/all-categories", drinksController.addNewDrinkType);
drinksRouter.put("/api/all-categories", drinksController.editDrinkType);
drinksRouter.delete("/api/all-categories/:categoryId", drinksController.deleteDrinkType);
drinksRouter.get("/api/all-milk-substitutes", drinksController.getAllMilkSubstitutes);

module.exports = drinksRouter;