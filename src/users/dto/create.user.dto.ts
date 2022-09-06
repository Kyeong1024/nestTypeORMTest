import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
