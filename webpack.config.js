// 여기선 서버코드 하나도 안 쓸거임
// 100% 클라이언트 코드
// babel을 쓸 수 없으므로 옛날 자바스크립트 써야함

const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");
const MiniExtractCSS = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: [ENTRY_FILE, "@babel/polyfill"],
    mode: MODE,
    // 모듈을 발견할 때마다 다음과 같은 rule을 따라라
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                // 만약 .scss파일을 만난다면
                test: /\.(scss)$/,
                // 이 plugin을 사용해라
                use: ExtractCSS.extract([
                    // 4. pure css를 어딘가로 보냄
                    {
                        loader: "css-loader", // 3. 웹팩이 css를 이해할 수 있게 하는 플러그인
                    },
                    {
                        loader: "postcss-loader", // 2. 잡다한 것처리 및 호환성 처리 ex IE와의 호환?
                        options: {
                            plugin() {
                                return [
                                    autoprefixer({ browsers: "cover 99.5%" }),
                                ];
                            },
                        },
                    },
                    {
                        loader: "sass-loader", // 1. scss를 css로 바꿔주는 플러그인
                    },
                ]),
            },
        ],
    },
    output: {
        path: OUTPUT_DIR,

        filename: "[name].[format]",
    },
    plugins: [new ExtractCSS("styles.css")],
};
// const config = {
//     entry: ENTRY_FILE,
//     mode: MODE,
//     module: {
//         rules: [
//             {
//                 test: /\.scss$/,
//                 use: [
//                     {
//                         loader: MiniExtractCSS.loader,
//                         options: {
//                             hmr: process.env.WEBPACK_ENV === "development",
//                         },
//                     },
//                     "css-loader",
//                     {
//                         loader: "postcss-loader",
//                         options: {
//                             plugins() {
//                                 return [
//                                     autoprefixer({
//                                         overrideBrowserslist: "cover 99.5%",
//                                     }),
//                                 ];
//                             },
//                         },
//                     },

//                     "sass-loader",
//                 ],
//             },
//         ],
//     },
//     output: {
//         path: OUTPUT_DIR,
//         filename: "[name].js",
//     },
//     plugins: [
//         new MiniExtractCSS({
//             filename: "styles.css",
//         }),
//     ],
// };
module.exports = config;
