import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
  constructor(private readonly catsRepository: CatsRepository, private jwtService: JwtService) {}

   async jwtLogin(data: LoginRequestDto) {
    const {email, password } = data;
    //* 해당하는 email check 
    const cat = await this.catsRepository.findCatByEmail(email);
    if(!cat) {
      throw new UnauthorizedException('email과 비밀번호를 확인해주세요!');
    }

    //* password 확인하기 
    const isPasswordValidated: boolean = await bcrypt.compare(password, cat.password)
    if(!isPasswordValidated){
        throw new UnauthorizedException("이메일과 비밀번호를 확인해주세요")
    }

    const payload = {email: email, sub: cat.id}
    return {
        token: this.jwtService.sign(payload)
    }
}
}