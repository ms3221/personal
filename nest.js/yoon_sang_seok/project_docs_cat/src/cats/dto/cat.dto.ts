import { Cat } from 'src/schemas/cats.shcema';
//readonlydata가 필요
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';
//클래스의 장점 재사용성이 좋다.
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name' as const]) {
  @ApiProperty({
    example: '232323',
    description: 'id',
  })
  id: string;
} 