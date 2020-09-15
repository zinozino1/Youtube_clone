import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String, // Video의 fileUrl과 유사
    facebookId: Number,
    githubId: Number,
});

// passport -local -mongoose를 사용하면 이미 가입한 사람이 다른 방법으로 가입할 때 이미 가입했다고 알려줄 수 있음
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);
export default model;
