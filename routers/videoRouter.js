import express from "express";
import routes from "../routes"
import {
    videos,
    upload,
    videoDetail,
    editVideo,
    deleteVideo
  } from "../controllers/videoController";

const videoRouter = express.Router();

export default videoRouter; // default는 전체를 export한다는 뜻


videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

/*
    /videos
    /upload
    /videoDetail
    /editVideo
    /deleteVideo
    으로 들어오는 경우
*/ 