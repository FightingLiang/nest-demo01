import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleController } from "./article/article.controller";
import { UserController } from "./user/user.controller";
import { NewsController } from "./news/news.controller";
import { NewsService } from "./news/news.service";
import { UploadController } from "./upload/upload.controller";
import { MultiUploadController } from "./multi-upload/multi-upload.controller";
import { InitMiddleware } from "./middleware/init.middleware";
import { NewsMiddleware } from "./middleware/news.middleware";
import { UserMiddleware } from "./middleware/user.middleware";


@Module({
  imports: [],
  controllers: [AppController, ArticleController, UserController, NewsController, UploadController, MultiUploadController],
  providers: [AppService, NewsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置中间方式
    // 根模块可以配置类中间件也可以配置函数式中间件
    // 方式一
    // consumer
    //   .apply(InitMiddleware)
    //   .forRoutes('*'); // * 代表匹配所有路由，如果是填入user，代表经过user这个页面时，才会匹配中间件
      // .forRoutes('user'); // * 代表匹配所有路由，如果是填入user，代表经过user这个页面时，才会匹配中间件
      // .forRoutes({path: 'user', method: RequestMethod.GET}); // 当访问user页面，并且执行get请求时才会匹配中间件，如果还.All代表所有请求都会匹配中间件

    // 方式二(可以无限叠加)
    // consumer
    //   .apply(InitMiddleware)
    //   .forRoutes('*')
    //   .apply(UserMiddleware)
    //   .forRoutes('user')

    // 方式三（只为user，跟news路由配置中间件）
    consumer
      .apply(UserMiddleware, NewsMiddleware)
      .forRoutes({path: 'user', method: RequestMethod.ALL}, {path: 'news', method: RequestMethod.ALL})
    // 全局中间件在main.ts文件定义
  }
}
