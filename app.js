
// ** 서버를 생성하기 위해 준비 **

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter  from "./routers/userRouter"; 
import videoRouter from "./routers/videoRouter"; 
import globalRouter from "./routers/globalRouter"
import routes from "./routes"


const app = express();

app.set('view engine', "pug");

// 모든 라우트들에 적용되는 미들웨어 - 작성된 대로 순서대로 미들웨어가 실행된다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev')); 
app.use(helmet()); 
app.use(function(req, res, next) {
    let date = new Date();
    let [a,b,c] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    console.log(`Time : ${a}:${b}:${c}`);
    next();
});


// Uri에 따라 분기하도록하는 미들웨어
app.use("/user", userRouter); 
app.use("/video", videoRouter);
app.use("/", globalRouter);

export default app; 

