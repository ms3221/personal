import { Cat } from './../../schemas/cats.shcema';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class LoginRequestDto extends PickType(Cat, ['email', 'password']) {}
