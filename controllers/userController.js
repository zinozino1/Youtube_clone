import {videoList} from "../db"
import routes from "../routes";
import { localsMiddleWare } from "../middlewares";
export const getJoin = (req, res) => {
    
    res.render("join",{pageTitle:'Join'});
}
export const postJoin = (req, res) => {
    // console.log(req.body);
    // form태그에서 입력한 정보를 추출 가능!
    const {
        body:{name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join", {pageTitle:'Join', videoList:videoList});
    }
    else{
        // redirect
        // ToDo1 : Register User
        // ToDo2 : User Login
        res.redirect(routes.home)
    }
       

    
}
export const getLogin = (req, res) => res.render("login",{pageTitle:'Login'});
export const postLogin = (req, res) => {
    console.log(req.body);
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // Todo : 로그아웃처리
    
    res.redirect(routes.home);
}
export const users = (req, res) => res.render("user",{pageTitle:'User'});
export const userDetail = (req, res) => res.render("userDetail",{pageTitle:'User Detail'});
export const editProfile = (req, res) => res.render("editProfile",{pageTitle:'Edit Profile'});
export const changePassword = (req, res) => res.render("changePassword",{pageTitle:'Change Password'});