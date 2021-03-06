import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('我是init的中间件');
    next();
  }
}
