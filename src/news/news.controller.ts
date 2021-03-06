import { Controller, Get, Param, Query, Render, UsePipes } from "@nestjs/common";
import { NewsService } from "./news.service";
import { NewsPipe } from "../pipe/news.pipe";

@Controller('news')
export class NewsController {
  constructor(private newsServices: NewsService) {}
  @Get()
  @Render('default/news')
  @UsePipes(new NewsPipe())
  index(@Query() info) {
    console.log('info', info);
    return {
      newsList: this.newsServices.findAll()
    };
  }
}
