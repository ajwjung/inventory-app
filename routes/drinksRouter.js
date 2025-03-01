const { Router } = require("express");
const drinksController = require("../controllers/drinksController.js");

const drinksRouter = Router();

drinksRouter.get("/", (req, res) => {
  res.send("Hello, World!");
})
// Original controller - not in use yet, I don't think?
// drinksRouter.get("/api/all-items", drinksController.getDrinks);

// New controller - gets all drinks with their categories (includes same name drinks)
drinksRouter.get("/api/all-items", drinksController.getDrinksWithInfo);
// Original controller - groups same name records
drinksRouter.get("/api/items-per-category", drinksController.getDrinksPerType);
drinksRouter.get("/api/all-categories", drinksController.getAllDrinkTypes);
drinksRouter.post("/api/all-categories", drinksController.addNewDrinkType);
drinksRouter.put("/api/all-categories", drinksController.editDrinkType);
drinksRouter.delete("/api/all-categories/:categoryId", drinksController.deleteDrinkType);

module.exports = drinksRouter;