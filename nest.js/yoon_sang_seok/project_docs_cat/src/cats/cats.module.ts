import { AuthModule } from './../auth/auth.module';
import { CatsRepository } from 'src/cats/cats.repository';
import { CatSchema } from './../schemas/cats.shcema';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from 'src/schemas/cats.shcema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]), forwardRef(()=>AuthModule)],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
