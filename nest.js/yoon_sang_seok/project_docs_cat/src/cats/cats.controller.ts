import { Request } from 'express';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { Body, Controller, Get, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cat } from 'src/schemas/cats.shcema';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }
  @ApiResponse({
    status: 500,
    description: 'Server Errorr..',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async singUp(@Body() body: CatRequestDto): Promise<any> {
    return this.catService.signUp(body);
  }
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }
  @Post('logout')
  logOut() {
    return 'logout';
  }
}
