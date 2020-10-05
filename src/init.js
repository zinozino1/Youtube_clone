import "@babel/polyfill";
import dotenv from "dotenv";
import "./db"; // 이게 가능하네. init.js를 실행할 때 db.js를 실행시킨다는 의미 같은디
import app from "./app";
import "./models/Video"; // init.js를 실행할 때 Video.js도 실행한다
import "./models/Comment";
import "./models/User";
dotenv.config(); // 환경변수 사용할 준비 완료

const PORT = process.env.PORT || 4000;

const handleListening = () =>
    console.log(`✅Listening on : http://localhost:${PORT}`);

app.listen(PORT, handleListening);
