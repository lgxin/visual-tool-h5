var express = require('express')
var fs = require('fs')
var moment = require('moment');
var debug = require('debug')('demo:server');
var path = require('path');
const multer = require('multer');
var bodyParser = require("body-parser");

var upload = multer({		//multer中间件的使用方法可以命令行npm search multer
  dest: './public/upload/'        //决定文件上传存放的目录
})
var app = express();
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // if (req.method.toLowerCase() == 'options'){
    //     // res.send(200);  //让options尝试请求快速结束
    // } else {
    //     next();
    // }
    next();
})
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('./public/upload'));

var post = process.env.PORT || 8089

app.get('/img/*', function (req, res, next) {
    const imageName = req.path.split('/')[2];
    res.sendFile(path.join(__dirname, './public/upload/'+imageName));
})
app.post('/upload/file',upload.single('avatar'),function(req, res) {
  const {filename,destination} = req.file;
  const customFileName = moment(new Date()).format('YYYYMMDDhhmmss')
  fs.rename(`${destination}${filename}`, `${destination}${customFileName}.jpg`, function(err) {
    if (!err) {
        console.log(filename + '副本替换成功!')
    } 
  })
  res.json({
    code: 200,
    data: `/img/${customFileName}.jpg`,
    msg: 'ok'
  })
})
app.post('/upload/image', function(req, res) {
  const file = req.body.file;
   let base64Data = file.replace(/^data:image\/\w+;base64,/, "");
   let dataBuffer = Buffer.from(base64Data, 'base64');
   const allowExtname = ['png', 'jpg', 'jpeg', 'webp', 'bmp'];//支持的图片格式
   //获取扩展名
    //    let extname = '';
    //    let filterResult=allowExtname.filter(item => {
    //        return file.includes(item)
    //    })
    //    extname='.'+filterResult[0]
   //指定目标存放路径
   let targetPath = path.resolve(__dirname, './public/upload')//自定义文件夹
   // 写入图片
   const fileName = moment(new Date()).format('YYYYMMDDhhmmss')
   fs.writeFileSync(`${targetPath}/${fileName}.png`, dataBuffer)
   res.json({
       code: 200,
       data: fileName,
       msg: 'ok'
   });
})
var server = app.listen(post, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Yu Travel app listening at http://%s:%s', host, port);
});
server.on('listening', onListening);
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}