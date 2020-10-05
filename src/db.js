import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL_PROD, {
    // 그냥 추가하자
    useNewUrlParser: true,
    useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () =>
    console.log("✅Connected to DB on : //localhost:27017");
const handleError = () => console.log("❌Error");

db.once("open", handleOpen);
db.on("error", handleError);

// // fake Database

// export const videoList = [
//     {
//         id: 123123,
//         title: 'Video awesome',
//         description: 'fuck you',
//         views: 99999999,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: { // user
//             id: 7777777,
//             name: "Nicolas",
//             email: "nico@las.com"
//         }
//     },
//     {
//         id: 345234,
//         title: 'Video fuck',
//         description: 'fuck you',
//         views: 1111111,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: { // user
//             id: 123412,
//             name: "Nicolas",
//             email: "nico@las.com"
//         }
//     },
//     {
//         id: 123894,
//         title: 'Video you',
//         description: 'fuck you',
//         views: 99999999,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: { // user
//             id: 222344,
//             name: "Nicolas",
//             email: "nico@las.com"
//         }
//     }
// ]
