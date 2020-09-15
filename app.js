// ** 서버를 생성하기 위해 준비 **
process.setMaxListeners(50);
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import { localsMiddleWare } from "./middlewares";
import connect_flash from "connect-flash";
import routes from "./routes";
import "./passport";
const app = express();
const CokieStore = MongoStore(session);
// 모든 라우트들에 적용되는 미들웨어 - 작성된 대로 순서대로 미들웨어가 실행된다.
// app.use(함수) 형태
app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser()); // 쿠키를 가져옴
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    // 암호화된 쿠키정보를 해독한다
    session({
        secret: process.env.COOKIE_SECRET, // 암호화된 세션id를 보내고, 받음
        resave: true,
        saveUninitialized: false,
        // 쿠키정보를 DB에 저장한다 -> 서버재시작해도 로그인정보가 남아있을 것임
        store: new CokieStore({ mongooseConnection: mongoose.connection }),
    }),
);
// 해독된 쿠키정보 (id, email등)가 일로 넘어온다.
app.use(passport.initialize()); // 쿠키파서를 검사

// -> id가 여기로 넘겨지면 passport.js의 deserialize함수 실행된다.
// -> deserialize함수가 실행되면 req.user정보가 미들웨어로 합류하게되어서 모든 라우터에서 시용 가능하게 된다.
app.use(passport.session());

// 이 이후로는 req.user가 생긴다.

app.use(localsMiddleWare); // 로컬 ->글로벌 변환 미들웨어, 쿠키가 있으면 템플릿에 req.user전달
app.use(function (req, res, next) {
    let date = new Date();
    let [a, b, c] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    console.log(`Time : ${a}:${b}:${c}`);
    next();
});

// Uri에 따라 분기하도록하는 미들웨어
// app.use('경로', 라우터) 형태

// 주어진 디렉토리에서 파일을 전달하는 미들웨어
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
// app.use(express.static("css"));
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/", globalRouter);

export default app;
