import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  test() {
    return 'hello cats';
  }
}
