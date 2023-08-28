const express = require("express");
const mongoDB = require("./config");
const app = express();
const port = 8000;
const myMongoDB = require("./config");
const cors = require("cors");
app.use(cors());
mongoDB();
app.use(cors());
app.use(express.json());

const UserData =    require("./route/CreateUser");
const DisplayData = require("./route/DisplayData");
const OrderData = require("./route/OrderData");
app.use("/api", UserData);
app.use("/api", DisplayData);  
app.use("/api", OrderData);  
app.get("/", (req, res) => {
  res.send("hullo word");
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
