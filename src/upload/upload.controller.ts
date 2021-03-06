import { Body, Controller, Get, Post, Render, Response, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from "fs";
import { join } from 'path'

@Controller('upload')
export class UploadController {
  @Get()
  @Render('default/upload')
  index() {
    return ''
  }
  @Post('doAdd')
  @UseInterceptors(FileInterceptor('avator')) // 上传单图 FileInterceptor，上传多图 FilesInterceptor，avator 是前端页面 上传文件input框的name
  doAdd(@Body() body, @Response() res, @UploadedFile() file) {
    console.log('单文件', file);
    // 必须在form表单配置属性 enctype="multipart/form-data"
    let stream = createWriteStream(join(__dirname, '../../public/upload', `${Date.now()}-${file.originalname}`))
    stream.write(file.buffer)
    res.redirect('/upload')
  }
}
