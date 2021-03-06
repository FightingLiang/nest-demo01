import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NewsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`我是管道的值`, value); // 可以修改 get 或者 post传过来的值，可以用于验证传值是否合法
    value.name = '被人串改过的名字'
    return value;
  }
}
