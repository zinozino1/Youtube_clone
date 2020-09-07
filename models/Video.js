// 내 Video들의 형태롤 기록

import mongoose from "mongoose";

// schema : 형태
// model : 실제 데이터

const videoSchema = new mongoose.Schema({ // json형태로 정의
    // 이것이 하나의 Document
    fileUrl : {
        type: String,
        required : 'File URL is required' // file URL이 없는 Video를 생성하려 한다면 이 error메시지를 출력함 
    },// 절대 Video자체를 데이터베이스에 저장하지 않는다. 비디오의 링크를 집어넣는 것임. 비디오자체는 AWS에 집어넣는다. 이렇게하는 이유는 데이터베이스 자체가 존나 무거워지기 때문 
    title:{
        type: String,
        required: "Title is required"
    },
    description: String,
    views:{
        type:Number,
        default:0
    },
    createdAt : {
        type: Date,
        default : Date.now // document를 저장할 때마다 현재날짜 저장시킴
    }

})

const model = mongoose.model("Video", videoSchema);
export default model;