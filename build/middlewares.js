import multer from "multer";
import routes from "./routes";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

// 웹서버 videos라는 디렉토리를 새로 만들고 거기다가 비디오 파일을 저장하겠다.
// 당연히 videoController에서 디비에 비디오 저장도 실시된다

// 기존의 방법 : 웹서버에 직접 비디오 및 아바타URL이 저장댐
// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvatar = multer({ dest: "uploads/avatars/" });

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "houtube/video",
    }),
});

const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "houtube/avatar",
    }),
});

// 템플릿에서 사용할 수 있는 글로벌 변수 정의

export const localsMiddleWare = (req, res, next) => {
    res.locals.siteName = "HoooouTube"; // 이녀석은 글로벌 변수가 되었다.
    res.locals.routes = routes;
    // user가 존재하지 않는다면 빈 객체 반환

    // req.user는 passport의 deserializeUser에서 온다.
    // 쿠키정보가 없을 경우 req.user는 undefined 있을 경우 해당 유저정보.
    res.locals.loggedUser = req.user || null; // passport가 처리해준다? -> header.pug에서 쓰인다. 잘 볼것

    // console.log("logged User" + req.user);
    next();
    // res.locals.routes
}; // locals에 추가되면 이제 그것들을 템플릿에서 사용할 수 있다.

// 로그아웃 된 사용자만 접근 허가
export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

// 로그인 된 사용자만 접근 허가
export const onlyPrivate = (req, res, next) => {
    if (!req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

// post방식으로 파일을 올릴 수 있게 해주는 미들웨어 post방식으로 들어온 파일은 웹서버 upload에 저장된다.
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
