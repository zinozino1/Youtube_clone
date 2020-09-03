import express from "express";
// === const express = require('express');
import routes from "../routes"
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

export default userRouter;

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail); // /:id이므로 맨 마지막에 둬야하나? 외우자 ㅅㅂ


/*
  /users/users
  /users
  /userDetail
  /editProfile
  /changePassword
  으로 들어올 경우
*/ 