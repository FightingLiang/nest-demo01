import { Controller, Get, Response } from "@nestjs/common";

@Controller('article')
export class ArticleController {
  @Get()
  index(@Response() res) {
    res.cookie('username', '菜心', {maxAge: 10000, httpOnly: true, signed: true}) // 花括号为非必填，maxAge 过期时间为10分钟，httpOnly 是否后端才能访问到，默认为false,signed 是否加密
    res.send('我是一个文章页面')
  }
  @Get('addArticle')
  addArticle(): string {
    return '添加文章';
  }
}
