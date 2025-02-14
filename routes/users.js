const express = require("express");
const router = express.Router();
const Article = require("../models/Article.js");
const Pannel = require("../models/PannelSchema.js");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

function isAuthenticated(req, res, next) {
 if (req.session.userId !== undefined) {
  return next(); // المتابعة إذا كان المستخدم مسجلاً
 }
 req.flash("error", "Vous devez vous connecter pour accéder à cette page.");
 res.redirect("/login"); // إعادة توجيه إذا لم يكن مسجلاً
}

// function isAdmin(req, res, next) {
//     if (req.session.user && req.session.user === "admin") {
//         return next();
//     }
//     req.flash("error", "لا تملك الصلاحيات اللازمة للوصول إلى هذه الصفحة.");
//     res.redirect("/login");
// }

function isUser(req, res, next) {
 if (req.session.user && req.session.user === "user") {
  return next();
 }
 req.flash(
  "error",
  "Vous n'avez pas les autorisations nécessaires pour accéder à cette page."
 );
 res.redirect("/login");
}

router.get("/users", isAuthenticated, isUser, (req, res) => {
 Article.find()
  .then(result => {
   const resulte = result.filter(num => num.stock > 10);
   const datastock = result.filter(num => num.stock == 0);
   Pannel.find()
    .then(data => {
     let newData = data[data.length - 1];
     let total =
      newData.BOUSSKOURA +
      newData.MARRAKECH +
      newData.TANGER +
      newData.AGADIR +
      newData.ZARKTOUNI +
      newData.DARBOUAZA +
      newData.TEMARA +
      newData.MEKNES +
      newData.SOUKRATE;
     res.render("../views/users/indexUsers", {
      arry: result,
      data: resulte,
      array: datastock,
      chiffre: data[data.length - 1],
      TotalChiffre: total
     });
    })
    .catch(err => {
     console.log(err);
    });
  })
  .catch(err => {
   console.log(err);
  });
});
router.get("/ModifChiffreUser", isAuthenticated, isUser, (req, res) => {
 Pannel.find()
  .then(data => {
   res.render("../views/users/ModifChiffreUser.ejs", { result: data });
  })
  .catch(err => {
   console.log(err);
  });
});

router.get("/afficheUsers/:id", isAuthenticated, isUser, (req, res) => {
 Pannel.findById(req.params.id)
  .then(result => {
   let total =
    result.BOUSSKOURA +
    result.MARRAKECH +
    result.TANGER +
    result.AGADIR +
    result.ZARKTOUNI +
    result.DARBOUAZA +
    result.TEMARA +
    result.MEKNES +
    result.SOUKRATE;
   res.render("../views/users/afficheurChiffreUser", {
    arr: result,
    totalChiffre: total
   });
  })
  .catch(err => {
   console.log(err);
  });
});


router.get("/usersTable", isAuthenticated, isUser, (req, res) => {
 Article.find()
  .then(result => {
   res.render("../views/users/usersTables", { data: result });
  })
  .catch(err => {
   console.log(err);
  });
});

router.get("/teamUsers", isAuthenticated, isUser, (req, res) => {
 res.render("../views/users/TeamUsers");
});

module.exports = router;
