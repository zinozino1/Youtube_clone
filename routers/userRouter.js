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
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);


/*
  /users/users
  /users
  /userDetail
  /editProfile
  /changePassword
  으로 들어올 경우
*/ 