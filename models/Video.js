// 내 Video들의 형태롤 기록

import mongoose from "mongoose";

// schema : 형태
// model : 실제 데이터

const videoSchema = new mongoose.Schema({ // 스키마 정의 json형태로 정의
    // 이것이 하나의 Document
    // ObjectId는 비디오가 도큐멘트가 생성될 때마다 자동으로 만들어진다.
    fileUrl : {
        type: String,
        required : 'File URL is required' // file URL이 없는 Video를 생성하려 한다면 이 error메시지를 출력함 
    },// 절대 Video자체를 데이터베이스에 저장하지 않는다. 비디오의 링크를 집어넣는 것임. 비디오자체는 AWS에 집어넣는다. 이렇게하는 이유는 데이터베이스 자체가 존나 무거워지기 때문 
    title:{
        type: String,
        required: "Title is required"
    },
    description: String, // 줄 옵션이 없다면 한줄로 표현해도 댐 하지만 줄 옵션이 있다면 무조건 객체로 표현하자.
    views:{
        type:Number,
        default:0
    },
    createdAt : {
        type: Date,
        default : Date.now // document를 저장할 때마다 현재날짜 저장시킴
    },
    comments:[{ // 두번째 방법 : 동영상 하나 생성시 그 동영상에 해당하는 코멘트를 배열로 넣기
        type: mongoose.Schema.Types.ObjectId, // 어떤 id를 가진 비디오에 코멘트를 남겼는지
        ref: "Comment"
    }] // 여기엔 comment의 모든 정보가 오는 것이 아니라 comment의 아이디만 오게 된다.
    // --> 비디오 하나는 여러개의 코멘트를 가질 수 있기 때문에 comments:[{}] 이렇게 함(배열)
})

const model = mongoose.model("Video", videoSchema); // 스키마 등록
export default model;