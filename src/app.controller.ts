import { Controller, Get, Render, Request } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('default/index')
  getHello(@Request() req) {
    // 设置session
    req.session.address = '广东深圳'
    return { name: '菜心', age: '23' };
  }

  @Get('session')
  getSession(@Request() req): string {
    console.log(req.session.address);
    return '获取商品详情接口';
  }
}
