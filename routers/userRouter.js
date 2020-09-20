import express from "express";
// === const express = require('express');
import routes from "../routes";
import {
    users,
    userDetail,
    editProfile,
    changePassword,
    getEditProfile,
    postEditProfile,
    postChangePassword,
    getChangePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

export default userRouter;

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail); // /:id이므로 맨 마지막에 둬야하나? 외우자 ㅅㅂ

/*
  /users/users
  /users
  /userDetail
  /editProfile
  /changePassword
  으로 들어올 경우
*/
