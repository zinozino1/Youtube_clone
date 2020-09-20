import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    // comment와 video의 relationship을 잘 정의해아함.
    text: {
        type: String,
        required: "Text is required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, // User 모델의 id가 오게된다.
        ref: "User",
    },
    // video:{ // 첫번째 방법 comment 스키마에 video 넣기
    //     type: mongoose.Schema.Types.ObjectId, // 어떤 id를 가진 비디오에 코멘트를 남겼는지
    //     ref:"Video" // 어디서부터 온건지 명시해줘야함.
    // } -> 코멘트 하나는 비디오 하나랑만 매핑되므로 video:{} 이렇게 해야함(객체 1개)
});

const model = mongoose.model("Comment", commentSchema);
export default model;
