const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const rootRouter = require("../backend/routes/index");
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", rootRouter);

app.listen(3000, () => console.log("hi"));
