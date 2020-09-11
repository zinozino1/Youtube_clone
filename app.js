// ** 서버를 생성하기 위해 준비 **
process.setMaxListeners(50);
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import { localsMiddleWare } from "./middlewares";
import routes from "./routes";

const app = express();

// 모든 라우트들에 적용되는 미들웨어 - 작성된 대로 순서대로 미들웨어가 실행된다.
// app.use(함수) 형태
app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleWare); // 로컬 ->글로벌 변환 미들웨어

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
app.use("/user", userRouter);
app.use("/video", videoRouter);
app.use("/", globalRouter);

export default app;
