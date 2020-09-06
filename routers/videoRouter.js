import express from "express";
import routes from "../routes"
import {
    videos,
    videoDetail,
    editVideo,
    deleteVideo,
    postUpload,
    getUpload
  } from "../controllers/videoController";

const videoRouter = express.Router();

export default videoRouter; // default는 전체를 export한다는 뜻


videoRouter.get(routes.videos, videos);
videoRouter.post(routes.upload, postUpload);
videoRouter.get(routes.upload, getUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
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