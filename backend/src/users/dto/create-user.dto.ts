import { IsEmail, IsString, MinLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

// Define enums for validation
export enum UserType {
  NORMAL = 'NORMAL',
  NPC = 'NPC',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  // Basic validation for now, can be a regex
  residentRegistrationNumber: string;

  @IsString()
  @IsNotEmpty()
  // Basic validation for now, can be a regex like /^\d{3}-\d{3,4}-\d{4}$/
  phoneNumber: string;

  

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  detailedAddress: string;

  @IsString()
  @IsOptional()
  businessRegistrationNumber?: string;
}