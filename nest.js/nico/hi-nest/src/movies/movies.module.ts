import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [MoviesController],
    providers: [MoviesService],
  })
export class MoviesModule {}
