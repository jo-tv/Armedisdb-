const express = require("express");
const router = express.Router();
const Login = require("../models/loginSchema.js");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

// إعداد rate limiter
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 دقيقة
    max: 4, // الحد الأقصى لمحاولات تسجيل الدخول
    handler: (req, res) => {
        // إرسال رسالة Flash عند تجاوز الحد
        req.flash(
            "error",
            "Vous avez dépassé le nombre autorisé de tentatives de connexion. Veuillez réessayer plus tard."
        );
        res.redirect("/login"); // إعادة توجيه إلى صفحة تسجيل الدخول
    }
});

router.get("/login", (req, res) => {
    res.render("../views/login/login", {
        error: req.flash("error") // تمرير رسائل الخطأ
    });
});

router.get("/regi", (req, res) => {
    res.render("../views/login/register");
});

router.post("/register", async (req, res) => {
    const newLogin = await new Login(req.body);
    newLogin.role;
    newLogin.email;
    newLogin.password;
    await newLogin.save();
    res.redirect("/login");
});

router.post("/login", loginLimiter, (req, res) => {
    Login.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                req.flash(
                    "error",
                    "Nom d'utilisateur ou mot de passe incorrect."
                );
                res.redirect("/login");
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(ok => {
                        if (!ok) {
                            req.flash(
                                "error",
                                "Nom d'utilisateur ou mot de passe incorrect."
                            );
                            res.redirect("/login");
                        } else {
                            req.session.user = user.role;
                            return user;
                        }
                    })
                    .then(id => {
                        req.session.userId = id._id;
                        if (req.session.userId) {
                            if (id.role === "admin") {
                                res.redirect("/");
                            } else if (id.role === "user") {
                                res.redirect("/users");
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
});

// مسار تسجيل الخروج

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).console.log("Error logging out");
        }
    });
    res.redirect("/login");
});

module.exports = router;
