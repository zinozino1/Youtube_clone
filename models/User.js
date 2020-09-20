import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String, // Video의 fileUrl과 유사
    facebookId: Number,
    githubId: Number,
    comments: [
        {
            // 두번째 방법 : 동영상 하나 생성시 그 동영상에 해당하는 코멘트를 배열로 넣기
            type: mongoose.Schema.Types.ObjectId, // 어떤 id를 가진 비디오에 코멘트를 남겼는지
            ref: "Comment",
        },
    ],
    videos: [
        {
            // 두번째 방법 : 동영상 하나 생성시 그 동영상에 해당하는 코멘트를 배열로 넣기
            type: mongoose.Schema.Types.ObjectId, // 어떤 id를 가진 비디오에 코멘트를 남겼는지
            ref: "Video", // 아하 포인터처럼 주소를 링크시킨 것과 유사!
        },
    ],
});

// passport -local -mongoose를 사용하면 이미 가입한 사람이 다른 방법으로 가입할 때 이미 가입했다고 알려줄 수 있음
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
export default model;
