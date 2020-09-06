import express from "express";
import routes from "../routes"
import {home, search} from "../controllers/videoController";
import { getJoin,postJoin, getLogin,postLogin, logout } from "../controllers/userController"; // default export가 아니기 때문에 중괄호 사용가능 

const globalRouter = express.Router();


// 라우트, 라우트로직함수 정의

// videoController
globalRouter.get(routes.home, home)
globalRouter.get(routes.search, search)
// userController
globalRouter.get(routes.join, getJoin)
globalRouter.post(routes.join, postJoin)

globalRouter.get(routes.login, getLogin)
globalRouter.post(routes.login, postLogin)

globalRouter.get(routes.logout, logout)


export default globalRouter; // globalRouter객체를 다른 파일도 쓸 수 있게끔 export


/*
    /
    /search
    /join
    /login
    /logout
    으로 들어올 경우
*/ 