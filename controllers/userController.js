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

// 앱 -> github
export const githubLogin = passport.authenticate("github");

// github -> app
export const githubLoginCallback = async (
    // passport.js에 있음
    accessToken,
    refreshToken,
    profile,
    cb, // passport에서 제공된 콜백함수
) => {
    const {
        _json: { id, avatar_url, login }, // github에서 제공하는 유저 프로필
    } = profile;
    const { value: email } = profile.emails.filter((item) => item.primary)[0];
    console.log(profile);
    try {
        const user = await User.findOne({
            email: email, // github에서 가져온 이메일과 동일한 이메일을 가진 유저를 디비에서 찾는다.
        });
        if (user) {
            // DB에 그 이메일이 동일한 유저가 있다면
            user.githubId = id;
            (user.avatarUrl = avatar_url), (user.name = login), user.save();
            return cb(null, user); // 첫번째인자 : 에러유무, 두번째인자 : 찾은 유저 --> 이걸 쿠키에 저장할 수 있다.
        } else {
            const newUser = await User.create({
                email,
                name: login,
                githubId: id,
                avatarUrl: avatar_url,
            });
            return cb(null, newUser); // 이새기는 serializeUser 미들웨어로 newUser를 전달한다.
        }
        console.log(user);
        //res.redirect(routes.home);
    } catch (error) {
        console.log(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    // Todo : 로그아웃처리
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User", user: req.user });
}; // req.user는 현재 로그인 된 사용자
export const users = (req, res) =>
    // global 변수인 loggeduser를 req.user로 오버라이딩 한 것
    res.render("user", { pageTitle: "User" });
export const userDetail = (req, res) =>
    res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });
