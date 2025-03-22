require("dotenv").config();
const path = require("path");

const express = require("express");
const drinksRouter = require("./routes/drinksRouter");
const PORT = process.env.PORT || 5000;

const app = express();

const cors = require("cors");
app.use(cors({ origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"] })
); // Allow requests from any origin (can be more specific if needed)

app.use(express.json());  // Parse JSON requests (from forms) and put into req.body
app.use(express.urlencoded({ extended: true }));

app.use("/api", drinksRouter);

// Serve static files from the React app's dist directory
app.use(express.static(path.join(__dirname, "client", "dist")));

// All other requests should be directed to the React app's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));