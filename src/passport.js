import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// passport 미들웨어 설정
// 1. strategy 설정에 해당된다.

passport.use(User.createStrategy()); // local 유저인증은 몽구스 스키마로 바로 가능한듯
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `https://sheltered-hamlet-11092.herokuapp.com/auth/github/callback`,
            scope: "user:email",
        },
        githubLoginCallback,
    ),
);

// 쿠키에 id넣기
passport.serializeUser(User.serializeUser());
// id로 사용자 식별
passport.deserializeUser(User.deserializeUser());

// 이코드는 지금 가만히 있는 상태. 임포트를 해줘야 실행되지 이녀석아.
