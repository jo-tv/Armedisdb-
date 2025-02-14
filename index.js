require("dotenv").config();
const express = require("express");
const flash = require("connect-flash");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000 || process.env.PORT;
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.static("public"));
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// إعداد مجلد الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));

// الوصول إلى رابط قاعدة البيانات من متغيرات البيئة
const dbURL = "mongodb+srv://josefmegane:mR47S2iaRxxR4ELS@cluster0.jmivy.mongodb.net/alldata?retryWrites=true&w=majority&appName=Armedis";

const store = new MongoDBStore({
 uri: dbURL,
 collection: "sessions"
});

app.use(
 session({
  secret: "mySuperSecretKeyhellobrder166628", // مفتاح تشفير الجلسات
  resave: false, // لا تعيد حفظ الجلسة إذا لم يتم تعديلها
  saveUninitialized: false, // لا تحفظ الجلسات الفارغة
  store: store // ربط الجلسة بمخزن MongoDB
 })
);

// استخدام express-flash
app.use(flash());

// page Admin sessiin
const index = require("./routes/Admin.js");
app.use("/", index);

// page users session
const users = require("./routes/users.js");
app.use("/", users);

// page login session
const login = require("./routes/login.js");
app.use("/", login);

// connect to server mongodb par mongoose
mongoose
 .connect(dbURL).then(() => {
  app.listen(port, (req, res) => {
   console.log(`localhost:${port}`, "connect is seccese");
  });
 })
 .catch(ererr => {
  console.log(ererr, "your problme conx");
 });
