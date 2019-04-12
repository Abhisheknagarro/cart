const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/api").route);

app.use(function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(2000, () => console.log("Server started at http://localhost:2000"));
