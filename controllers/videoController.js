// import {videoList} from "../db"
import routes from "../routes";
import Video from "../models/Video"; // video element자체가 아니라 model : element를 받는 통로라는 것을 인지하자.

// 이부분 매우매우매우 중요
export const home = async (req, res) => {
    // async : 이 함수의 어떤 부분은 꼭 기다려주렴 자바스크립트야.

    // async를 사용하지 않는다면 많은 수의 비디오가 아직 업로드 되지 않았다(디비에서 아직 꺼내오지 못했다 하더라도) 하더라도 홈페이지를 렌더링함 (노드는 비동기프로그래밍 기반)
    // but async를 사용한다면 비디오가 모두 업로드될 때까지 홈페이지를 렌더링하지 않는다.

    console.log(req.user);
    try {
        const videos = await Video.find({}).sort({ _id: -1 }); // 모델을 통해 데이터베이스에 있는 모든 비디오들을 가져오게된다.
        // Video.find() 작업이 끝날때까지 기다려줘
        // 즉 비디오를 디비에서 다 가져오면 그때 렌더링 해라 이뜻.
        res.render("home", { pageTitle: "Home", videoList: videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videoList: [] });
    }
};

// 템플릿 파일은 import 필요 없는듯
export const search = async (req, res) => {
    const {
        // 객체의 해체할당
        query, // query 자체를 쓴다
        query: {
            // term만 쓴다.
            term: searchingBy,
        },
    } = req; // req.query.term 보다 훨씬 좋은 방식
    // Video.findOne()
    let videos = [];
    try {
        // 그냥 searching by쓰면 정확히 그 단어여야 되지만 regex쓰면 단어를 '포함'하기만 하면 된다.
        videos = await Video.find({
            title: { $regex: searchingBy, $options: "i" },
        });
    } catch (error) {
        console.log(error);
    }
    res.render("search", {
        pageTitle: "Search",
        searchingBy: searchingBy,
        videoList: videos,
    });
};
export const videos = (req, res) =>
    res.render("videos", { pageTitle: "Videos" });
export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }, // multer미들웨어로부터 얻은 프로퍼티
    } = req;

    const newVideo = await Video.create({
        // 모델로부터 생성한 것 id는 자동으로 생성되는 듯?
        fileUrl: path,
        title: title,
        description: description, // 여기서 실제 데이터베이스에 저장?
        creator: req.user.id,
    });

    await req.user.videos.push(newVideo.id); // 존내 신기하네 _id아니고 id
    req.user.save();
    // Todo : upload and save video
    // 사용자가 비디오를 업로드하면 해당 비디오디테일 페이지로 리다이렉트 해야함
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    // req.param -> URL을 가져오는 유일한 방법
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id).populate("creator");

        console.log(video);

        // 가져올 객체를 세분화 시킨다. 즉 Video객체를 가져오는 것 같지만 사실은 User 객체를 가져오는 것

        res.render("videoDetail", {
            pageTitle: video.title,
            video: video,
        });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};
export const getEditVideo = async (req, res) => {
    // get : 뭔가 채워넣는 작업
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", {
            pageTitle: "Edit " + video.title,
            video: video,
        });
    } catch (error) {
        res.redirect(routes.home);
    }
};
export const postEditVideo = async (req, res) => {
    // post : 업데이트하고 redirect하는 작업
    const {
        params: { id },
        body: { title, description },
    } = req;
    try {
        const video = await Video.findOneAndUpdate(
            { _id: id },
            { title: title, description: description },
        ); // DB수정
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};
export const deleteVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    // console.log(req.params);
    try {
        const video = await Video.findByIdAndRemove(id);
        res.redirect(routes.home);
    } catch (error) {
        res.redirect(routes.home);
    }
};
