import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from '@hapi/joi';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private schema) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value)
    console.log('error', error);
    // 如果有问题就返回false，否则就返回value
    return error ? false : value;
  }
}
