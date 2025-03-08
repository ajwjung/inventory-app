require("dotenv").config();

const express = require("express");
const drinksRouter = require("./routes/drinksRouter");
const PORT = process.env.PORT || 5000;

const app = express();

const cors = require('cors');
app.use(cors({ origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"] })
); // Allow requests from any origin (can be more specific if needed)

app.use(express.json());  // Parse JSON requests (from forms) and put into req.body
app.use(express.urlencoded({ extended: true }));

app.use("/", drinksRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));