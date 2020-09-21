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
    // 디비에 잇는 정보와 대조하여 로그인시키고 로그인된 정보를 브라우저 쿠키에 저장시킨다.
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

//내 프로필
// req.user === 로그인되어 있는 유저(나)
export const getMe = (req, res) => {
    // global 변수인 loggeduser를 req.user로 오버라이딩 한 것
    res.render("userDetail", { pageTitle: "User", user: req.user });
}; // req.user는 현재 로그인 된 사용자
export const users = (req, res) => res.render("user", { pageTitle: "User" });
// 다른 유저 검색.
// user === 디비에 저장되어 있는 다른 유저
export const userDetail = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const user = await User.findById(id).populate("videos"); // 여기서 에러를 발생시키는 구만

        res.render("userDetail", { pageTitle: "User Detail", user: user });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => {
    res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
    const {
        user: { avatarUrl },
        body: { name, email },
        file, // multer가 제공해주는 것 이 함수 앞에 uploadAvatar 미들웨어가 있는 것을 기억하자
    } = req;
    try {
        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : avatarUrl,
        });
        res.redirect(routes.me);
    } catch (error) {
        console.log(error);
        res.redirect("editProfile", { pageTitle: "Edit profile" });
    }
};
export const getChangePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 },
    } = req;
    try {
        if (newPassword !== newPassword1) {
            res.status(400); // 브라우저에게 상태전달
            res.redirect("/user" + routes.changePassword);
            return; // 리디렉션에서 끝났는데 넌 왜?
        } else {
        }
        await req.user.changePassword(oldPassword, newPassword); // passport의 기능
        res.redirect(routes.me);
    } catch (error) {
        res.redirect("/user" + routes.changePassword);
        console.log(error);
    }
};
