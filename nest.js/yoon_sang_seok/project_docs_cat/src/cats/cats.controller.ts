import { ReadOnlyCatDto } from './dto/cat.dto';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cat } from 'src/schemas/cats.shcema';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }
  
  @ApiResponse({
    status:500,
    description: 'Server Errorr..',
  })
  @ApiResponse({
    status:200,
    description: 'success',
    type : ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async singUp(@Body() body: CatRequestDto): Promise<any> {
    return this.catService.signUp(body);
  }
  @Post('login')
  logIn() {
    return 'login';
  }
  @Post('logout')
  logOut() {
    return 'logout';
  }
}