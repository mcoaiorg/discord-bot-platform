const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const botRoutes = require("./routes/bot");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/bot", botRoutes);

app.listen(3000, () => {
  console.log("Instant Publisher running on port 3000");
});
