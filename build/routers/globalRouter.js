import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    logout,
    githubLogin,
    githubLoginCallback,
    postGithubLogin,
    getMe,
} from "../controllers/userController"; // default export가 아니기 때문에 중괄호 사용가능
import connect_flash from "connect-flash";
import { onlyPublic, onlyPrivate } from "../middlewares";
const globalRouter = express.Router();

// 라우트, 라우트로직함수 정의
globalRouter.get(routes.me, getMe);

// videoController
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
// userController
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); // 회원가입시 바로 로그인 시켜줌

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin); // 그냥 로그인

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin); // 앱에서 깃허브로 갈 때
globalRouter.get(
    // 깃허브에서 앱으로 올 때
    routes.githubCallback,
    passport.authenticate("github", {
        // 인증 한번 더한다
        failureRedirect: routes.login,
        //successRedirect: routes.home,
    }),
    postGithubLogin, // 인증에 성공한 상황에서 호출이 되어야한다.
);

export default globalRouter; // globalRouter객체를 다른 파일도 쓸 수 있게끔 export

/*
    /
    /search
    /join
    /login
    /logout
    으로 들어올 경우
*/
