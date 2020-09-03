import routes from "./routes"

export const localsMiddleWare = (req, res, next) => {
    
    res.locals.siteName = 'HoooouTube'; // 이녀석은 글로벌 변수가 되었다.
    res.locals.routes = routes;
    next();
    // res.locals.routes
}; // locals에 추가되면 이제 그것들을 템플릿, 컨트롤러 등 어디에서든지 사용할 수 있다.