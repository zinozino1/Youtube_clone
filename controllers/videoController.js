import {videoList} from "../db"


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
        searchingBy : searchingBy
    });


}
export const videos = (req, res) => res.render("videos",{pageTitle:'Videos'});
export const upload = (req, res) => res.render("upload",{pageTitle:'Upload'});
export const videoDetail = (req, res) => {
    res.render("videoDetail",{
        pageTitle:'VideoDetail',
        videoList: videoList
    });
}
export const editVideo = (req, res) => res.render("editVideo",{pageTitle:'EditVideo'});
export const deleteVideo = (req, res) => res.render("deleteVideo",{pageTitle:'DeleteVideo'});