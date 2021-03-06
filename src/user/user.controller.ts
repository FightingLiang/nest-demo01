import { Body, Controller, Get, Post, Query, Render, Request, Response, UsePipes } from "@nestjs/common";
import { UserPipe } from "../pipe/user.pipe";
import * as Joi from '@hapi/joi';
// 定义 schema 限制条件
let schema = Joi.object().keys({
  name: Joi.string().required(), // 字符串，必传
  // age: Joi.number().integer().min(1).max(2).required(),  // 数字，整型，最小6位，最大66位，必传
})
@Controller('user')
export class UserController {
  @Get()
  @Render('default/user')
  @UsePipes(new UserPipe(schema))
  index(@Query() info): string {
    console.log('info', info);
    return '';
  }
  @Get('add')
  addData(@Query() query): string {
    return query;
  }
  @Get('edit')
  editData(@Request() res): string {
    return res.query;
  }
  @Post('create')
  create(@Body() body, @Response() res): string {
    console.log('触发了post', body);
    res.redirect('/user');
    return '';
  }
  @Get('cookie')
  getCookie(@Request() req): string{
    // req.cookies.username 获取不加密cookie
    return req.signedCookies.username // 获取加密cookie
  }
}
