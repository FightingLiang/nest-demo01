import { Body, Controller, Get, Post, Render, UploadedFiles, UseInterceptors, Response, Logger } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { createWriteStream } from "fs";
import { join } from 'path'
@Controller('multi-upload')
export class MultiUploadController {
  @Get()
  @Render('default/multiUpload')
  index(){
    return ''
  }
  @Post('doAdd')
  // @UseInterceptors(FileFieldsInterceptor([
  //   {name: 'avator', maxCount: 1},
  //   {name: 'bg', maxCount: 1},
  //   {name: 'bg', maxCount: 1},
  // ])) // 上传单图 FileInterceptor，上传多图 FilesInterceptor，avator 是前端页面 上传文件input框的name
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avator', maxCount: 1 },
    { name: 'bg', maxCount: 1 },
    { name: 'poster'},
  ]))
  doAdd(@Body() body, @UploadedFiles() files, @Response() res) {
    let all = []
    // 这里的files是一个对象，有avator，bg，poster三个属性，各个属性都是一个数组包裹着上传的文件
    for (const file in files) {
      console.log(`${file}----------${files[file]}`);
      all = [...all, ...files[file]]
    }
    console.log('总的', all.length);
    // for (let file of all) {
    //   let stream = createWriteStream(join(__dirname, '../../public/upload', `${Date.now()}-${file.originalname}`))
    //   stream.write(file.buffer)
    // }
    for (let i = 0;i<all.length;i++){
      let file = all[i]
      let stream = createWriteStream(join(__dirname, '../../public/upload', `${Date.now()}${i}-${file.originalname}`))
      stream.write(file.buffer)
    }
    res.redirect('/multi-upload')
  }
}
