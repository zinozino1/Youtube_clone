import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

// 쿠키에 id넣기
passport.serializeUser(User.serializeUser());
// id로 사용자 식별
passport.deserializeUser(User.deserializeUser());

// 이코드는 지금 가만히 있는 상태. 임포트를 해줘야 실행되지 이녀석아.
