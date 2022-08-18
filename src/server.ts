import express from "express";
import { pathData } from "./data";
const app = express();
const port = 3004;

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const pathData2 = await pathData();
  //res.send("Hello World!");
  res.render("index", { title: "Hey", message: "Hello there!", pathData2 });
});

app.get("/path", async (req, res) => {
  const pathData2 = await pathData();
  res.send(pathData2);
  //res.send("Hello World!");
  //res.render("index", { title: "Hey", message: "Hello there!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
