import routes from "./routes"
// 템플릿에서 사용할 수 있는 글로벌 변수 정의
export const localsMiddleWare = (req, res, next) => {
    
    res.locals.siteName = 'HoooouTube'; // 이녀석은 글로벌 변수가 되었다.
    res.locals.routes = routes;
    // 아직 가짜 정보
    res.locals.user = {
        isAuthenticated:true,
        id:1
    }
    next();
    // res.locals.routes
}; // locals에 추가되면 이제 그것들을 템플릿에서 사용할 수 있다.