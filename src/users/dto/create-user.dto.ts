import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";

export class CreateUserDto {
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 65)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 30)
  password: string;

  createdAt?: string;
  updatedAt?: string;
}
