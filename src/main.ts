import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { logger } from "./middleware/logger.middleware"
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源目录
  // app.useStaticAssets('public'); // 等价于 app.useStaticAssets(join(__dirname, '..', 'public'));
  // 配置虚拟目录(意思是 /static/对应资源名称)
  app.useStaticAssets('public', {
    prefix: '/static',
  });
  // 等价于
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/static',
  // });
  // 配置模板引擎
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');
  // 配置cookie中间件，cookieParser() 可以传任意字符串，代表可以用加密
  // app.use(cookieParser('this signed cookie'))
  app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
  // 全局中间件只能引入函数式中间件
  app.use(logger)
  await app.listen(3000);
}
bootstrap();
