const express = require("express");
const app = express();
const bookRouter = require("./router/book-router");
const userRouter = require("./router/user-router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use(bookRouter);

app.use(userRouter);

app.listen(3000, () => {
  console.log("server okay");
});
