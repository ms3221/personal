import { Request } from 'express';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cat } from 'src/schemas/cats.shcema';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catService: CatsService,
    private readonly authService: AuthService,
  ) {}
  @ApiOperation({ summary: '고양이 안녕' })
  @Get('')
  @UseGuards(JwtAuthGuard)
  getCurrentCat(@CurrentUser() cat: Cat) {
    console.log(123);
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
  @ApiOperation({ summary: 'login' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }
  @Post('logout')
  logOut() {
    return 'logout';
  }
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    return this.catService.uploadImg(cat, files);
  }
  @ApiOperation({summary: '모든고양이가져오기'})
  @Get('/all')
  allCat() {
    return this.catService.getAllCat()
  }
}
