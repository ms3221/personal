import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    example: 'jun@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref:
  })
  @IsEmail()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: 'jun',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12494',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    default:
      'http://localhost:8000/media/cats/2022-02-01_22-20-581669213238554.png',
  })
  @IsString()
  imgUrl: string;
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
  };
});
