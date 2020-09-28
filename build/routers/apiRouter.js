import express from "express";
import routes from "../routes";
import {
    registerView,
    getRegisterView,
    postRegisterView,
    addComment,
    postAddComment,
    postDeleteComment,
} from "../controllers/videoController";

export const apiRouter = express.Router();

//apiRouter.get(routes.registerView, postRegisterView);
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
