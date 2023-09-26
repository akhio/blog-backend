const express = require("express");
const app = new express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const validateMiddleware = require("./middleware/validationMiddleware");
const session = require("express-session");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
require("dotenv").config();
const hideButtonsMiddleware = require("./middleware/hideButtonsMiddleware");
const flash = require("connect-flash");

// Controllers
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const getPostContoller = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutUserController = require("./controllers/logout");
const authMiddleware = require("./middleware/authMiddleware");

// Database connection (MongoDB Atlas)
mongoose.connect(process.env.MONGODB_API_KEY);

// Middlewares
global.loggedIn = null;

app.use(flash());
app.use(
  session({
    resave: false, // Set to false to prevent the session from being saved on every request
    saveUninitialized: true, // Set to true to save a session that is new but not modified
    secret: "mysecretkey", // Provide a secure secret key
    cookie: { maxAge: 3600000 },
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userID;
  next();
});
app.use("posts/store", validateMiddleware);
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("*", hideButtonsMiddleware);

// Server port
app.listen(3000, () => {
  console.log("port on 3000");
});

// View
app.get("/auth/logout", logoutUserController);

app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post("/posts/store", authMiddleware, storePostController);

app.get("/", homeController);

app.get("/posts/new", authMiddleware, newPostController);

app.get("/posts/store", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/post/:id", getPostContoller);

app.use((req, res) => res.render("notfound"));
