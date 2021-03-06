import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  findAll() {
    return [
      {
        title: '标题1',
        id: '3123123',
      },{
        title: '标题2',
        id: '3123123',
      },{
        title: '标题3',
        id: '3123123',
      },{
        title: '标题4',
        id: '3123123',
      },
    ];
  }
}
