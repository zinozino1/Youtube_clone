// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id"; // 이건 모지?
const ME = "/me";

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// API - just server와 통신하기 위한 URL : user가 접근 x 이 url에 어떤것도 렌더링할 수 없다.

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/delete-comment";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) => {
        if (id) {
            return `/user/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if (id) {
            return `/video/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) => {
        if (id) {
            return `/video/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if (id) {
            return `/video/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me: ME,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT,
};

export default routes; // 이렇게 선언함으로써 어디에서든지 사용할 수 있게 되었다.
