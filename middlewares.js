import multer from "multer"
import routes from "./routes"


// 웹서버 videos라는 디렉토리를 새로 만들고 거기다가 비디오 파일을 저장하겠다.
const multerVideo = multer({dest:"uploads/videos/"})


// 템플릿에서 사용할 수 있는 글로벌 변수 정의

export const localsMiddleWare = (req, res, next) => {
    
    res.locals.siteName = 'HoooouTube'; // 이녀석은 글로벌 변수가 되었다.
    res.locals.routes = routes;
    // 아직 가짜 정보
    res.locals.user = {
        isAuthenticated:true,
        id:1
    }
    next();
    // res.locals.routes
}; // locals에 추가되면 이제 그것들을 템플릿에서 사용할 수 있다.

// uploadVideo는 함수이다.
 export const uploadVideo = multerVideo.single("videoFile");