import { Cat } from 'src/schemas/cats.shcema';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CatRequestDto extends PickType(Cat, ['email', 'name', 'password'] as const) {}