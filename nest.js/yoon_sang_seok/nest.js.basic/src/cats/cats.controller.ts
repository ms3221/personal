import { SuccessInterceptor } from './../common/success.interceptor';
import { PositiveIntPipe } from './../common/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from '../common/http-exception.filter';
import { CatsService } from './cats.service';
import { Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Put, UseFilters, UseInterceptors } from '@nestjs/common';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    //throw new HttpException('api borkne', 401);
    return 'all cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    // console.log(typeof param);
    return 'one cat';
  }

  @Put()
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartCat() {
    return 'cat';
  }

  @Delete()
  deleteCat() {
    return 'cat';
  }
}
