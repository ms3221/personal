import { Cat } from './../../schemas/cats.shcema';
import { PickType } from '@nestjs/swagger';



export class LoginRequestDto extends PickType(Cat, ['email', 'password']) {}