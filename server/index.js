const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/User");
app.use("/user", userRoute);

app.use("/images", express.static("images"));
app.listen(3001, (req, res) => {
  console.log("Server running...");
});
