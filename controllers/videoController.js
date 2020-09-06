import {videoList} from "../db"
import routes from "../routes";


// 템플릿 파일은 import 필요 없는듯
export const home = (req, res) => res.render("home" ,{pageTitle:'Home', videoList:videoList});
export const search = (req, res) => {
    const { // 객체의 해체할당
        query, // query 자체를 쓴다
        query:{ // term만 쓴다.
            term : searchingBy
        }
    } = req; // req.query.term 보다 훨씬 좋은 방식 
    res.render("search",
    {
        pageTitle:'Search',
        searchingBy : searchingBy,
        videoList:videoList
    });


}
export const videos = (req, res) => res.render("videos",{pageTitle:'Videos'});
export const getUpload = (req, res) => {
    res.render("upload",{pageTitle:'Upload'});
}
export const postUpload = (req, res) => {
    const {
        body: {
            file,
            title,
            description
        }
    } = req;
    // Todo : upload and save video
    // 사용자가 비디오를 업로드하면 해당 비디오디테일 페이지로 리다이렉트 해야함 
    res.redirect(routes.videoDetail(345234));
}

export const videoDetail = (req, res) => {
    res.render("videoDetail",{
        pageTitle:'VideoDetail',
        videoList: videoList
    });
}
export const editVideo = (req, res) => res.render("editVideo",{pageTitle:'EditVideo'});
export const deleteVideo = (req, res) => res.render("deleteVideo",{pageTitle:'DeleteVideo'});