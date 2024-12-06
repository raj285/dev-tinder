const express = require("express");
const app = express();

app.use("/", (err, req, res, next) => {
  console.log("mai bhi hun");
  if (err) {
    res.status(404).send("spmething went wrong");
  } else {
    next();
  }
});
// good way is to use try catch error logic
app.get("/user/getalldata", (req, res) => {
  res.send("user send data");
});
// error handelling
// err must come first
// chronology matters e->req->res->n

app.listen(7777);
