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

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user === "admin") {
        return next();
    }
    req.flash(
        "error",
        "Vous n'avez pas les autorisations nécessaires pour accéder à cette page."
    );
    res.redirect("/login");
}

// function isUser(req, res, next) {
//     if (req.session.user && req.session.user === "user") {
//         return next();
//     }
//     req.flash("error", "لا تملك الصلاحيات اللازمة للوصول إلى هذه الصفحة.");
//     res.redirect("/login");
// }

router.get("/", isAuthenticated, isAdmin, (req, res) => {
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
                    res.render("index", {
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

router.get("/ModifChiffre", isAuthenticated, isAdmin, (req, res) => {
    Pannel.find()
        .then(data => {
            res.render("ModifChiffre", { result: data });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/affiche", isAuthenticated, isAdmin, (req, res) => {
    res.render("afficheurChiffre");
});

router.get("/TableAdmin", isAuthenticated, isAdmin, (req, res) => {
    Article.find()
        .then(result => {
            
            res.render("tableAdmin", { data: result });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/cmdAdmin",  (req, res) => {
    Article.find()
        .then(result => {
            
            res.render("cmdAdmin", { data: result });
        })
        .catch(err => {
            console.log(err);
        });
});


router.get("/createArticle", isAuthenticated, isAdmin, (req, res) => {
    res.render("createArticle");
});

router.get("/team", isAuthenticated, isAdmin, (req, res) => {
    res.render("Team");
});

router.get("/pannel", isAuthenticated, isAdmin, (req, res) => {
    res.render("pannel");
});

router.get("/edit", isAuthenticated, isAdmin, (req, res) => {
    res.render("editData");
});

router.get(
    "/Modification/:id",
    isAuthenticated,
    isAdmin,

    (req, res) => {
        Article.findById(req.params.id)
            .then(result => {
                res.render("Modification", { arr: result });
            })
            .catch(err => {
                console.log(err);
            });
    }
);

router.get("/affiche/:id", isAuthenticated, isAdmin, (req, res) => {
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
            res.render("afficheurChiffre", {
                arr: result,
                totalChiffre: total
            });
        })
        .catch(err => {
            console.log(err);
        });
});

router.get("/pannelEdit/:id", isAuthenticated, isAdmin, (req, res) => {
    Pannel.findById(req.params.id)
        .then(data => {
            res.render("pannelEdit", { info: data });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post("/createArticle", isAuthenticated, isAdmin, async (req, res) => {
    const newData = await new Article(req.body);
    newData.Firstname;
    newData.Lastname;
    newData.Email;
    newData.Password;
    newData.Confirm;
    await newData.save();
    res.redirect("tableAdmin");
});

router.post("/pannel", isAuthenticated, isAdmin, async (req, res) => {
    const newPannel = await new Pannel(req.body);
    newPannel.BOUSSKOURA;
    newPannel.MARRAKECH;
    newPannel.TANGER;
    newPannel.AGADIR;
    newPannel.ZARKTOUNI;
    newPannel.DARBOUAZA;
    newPannel.TEMARA;
    newPannel.MEKNES;
    newPannel.SOUKRATE;
    newPannel.DATE;
    await newPannel.save();
    res.redirect("/");
});

router.put("/pannelEdit/:id", isAuthenticated, isAdmin, (req, res) => {
    Pannel.updateOne({ _id: req.params.id }, req.body)
        .then(data => {
            res.redirect("/ModifChiffre");
        })
        .catch(err => {
            console.log(err);
        });
});

router.put(
    "/Modification/:id",
    isAuthenticated,
    isAdmin,

    (req, res) => {
        Article.updateOne({ _id: req.params.id }, req.body)
            .then(data => {
                res.redirect("/TableAdmin");
            })
            .catch(err => {
                console.log(err);
            });
    }
);

router.delete(
    "/Modification/:id",
    isAuthenticated,
    isAdmin,

    (req, res) => {
        Article.deleteOne({ _id: req.params.id })
            .then(result => {
                res.redirect("/TableAdmin");
            })
            .catch(err => {
                console.log(err);
            });
    }
);

router.delete(
    "/pannelEdit/:id",
    isAuthenticated,
    isAdmin,

    (req, res) => {
        Pannel.deleteOne({ _id: req.params.id })
            .then(result => {
                res.redirect("/ModifChiffre");
            })
            .catch(err => {
                console.log(err);
            });
    }
);

module.exports = router;
