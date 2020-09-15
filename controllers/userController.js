import passport from "passport";

import routes from "../routes";
import { localsMiddleWare } from "../middlewares";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
    // console.log(req.body);
    // form태그에서 입력한 정보를 추출 가능!
    const {
        body: { name, email, password, password2 },
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join", videoList: videoList });
    } else {
        try {
            const user = await User({
                // create까지 안해도 댐 register가 해줄거기 때문
                name: name,
                email: email,
            });
            await User.register(user, password); // 임마가 실제 데이터베이스에 만든다.
            // 이녀석을 사용하면 DB에 salt와 hash라는 것이 생김
            next();
        } catch (error) {
            console.log(error);
        }

        // redirect
        // ToDo1 : Register User
        // ToDo2 : User Login
    }
};
export const getLogin = (req, res) =>
    res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    //failureFlash: "Invalid username or password.",
});

export const logout = (req, res) => {
    // Todo : 로그아웃처리

    res.redirect(routes.home);
};
export const users = (req, res) => res.render("user", { pageTitle: "User" });
export const userDetail = (req, res) =>
    res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });
