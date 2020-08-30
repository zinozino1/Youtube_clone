const express = require('express'); // 'express'라는 파일을 내 디렉토리에서 찾는다. 없으면 node_modules에서 찾는다.
const app = express();

app.listen(4000);




// app.get('/',function(req,res){
//     res.send('hello world');
// })