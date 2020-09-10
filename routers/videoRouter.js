import express from "express";
import routes from "../routes"
import {
    videos,
    videoDetail,
    editVideo,
    deleteVideo,
    postUpload,
    getUpload,
    postEditVideo,
    getEditVideo
  } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

export default videoRouter; // default는 전체를 export한다는 뜻


videoRouter.get(routes.videos, videos);
// uploadVideo는 웹서버상 /video라는 디렉토리에 비디오 파일을 올려놓을 것이고
// 그와 동시에 postUpload는 그 해당 파일(올린 비디오파일)에 접근할 것임 file방식이 아닌 URL방식으루
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.upload, getUpload);
videoRouter.get(routes.videoDetail(), videoDetail); // 괄호안에 id를 넣지 않으면 약간 '틀' 같은 느낌인듯
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo)
videoRouter.get(routes.deleteVideo(), deleteVideo);

/*
    /videos
    /upload
    /videoDetail
    /editVideo
    /deleteVideo
    으로 들어오는 경우
*/ 