import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto'; // New import
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private calculateAgeAndGenderFromRRN(
    residentRegistrationNumber: string,
  ): { birthYear: number; gender: 'male' | 'female' } {
    const yearPart = parseInt(residentRegistrationNumber.substring(0, 2), 10);
    const centuryIndicator = parseInt(
      residentRegistrationNumber.substring(6, 7),
      10,
    );

    let birthYear: number;
    let gender: 'male' | 'female';

    if (centuryIndicator === 1 || centuryIndicator === 2) {
      birthYear = 1900 + yearPart;
      gender = centuryIndicator === 1 ? 'male' : 'female';
    } else if (centuryIndicator === 3 || centuryIndicator === 4) {
      birthYear = 2000 + yearPart;
      gender = centuryIndicator === 3 ? 'male' : 'female';
    } else {
      // Handle other cases or throw an error for invalid RRN
      // For simplicity, we'll default or throw.
      // In a real application, more robust validation would be needed.
      throw new Error('Invalid Resident Registration Number format for age/gender calculation.');
    }

    return { birthYear, gender };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {
      id,
      email,
      password,
      userType,
      name,
      nickname,
      residentRegistrationNumber,
      phoneNumber,
      address,
      detailedAddress,
      businessRegistrationNumber,
    } = createUserDto;

    // Check for existing unique fields
    const existingUserById = await this.usersRepository.findOneBy({ id });
    if (existingUserById) {
      throw new ConflictException('ID already exists');
    }

    const existingUserByEmail = await this.usersRepository.findOneBy({ email });
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUserByNickname = await this.usersRepository.findOneBy({ nickname });
    if (existingUserByNickname) {
      throw new ConflictException('Nickname already exists');
    }

    const existingUserByPhoneNumber = await this.usersRepository.findOneBy({ phoneNumber });
    if (existingUserByPhoneNumber) {
      throw new ConflictException('Phone number already exists');
    }

    // Calculate birthYear and gender from RRN
    const { birthYear, gender } = this.calculateAgeAndGenderFromRRN(
      residentRegistrationNumber,
    );

    // Hash sensitive information
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedResidentRegistrationNumber = await bcrypt.hash(
      residentRegistrationNumber,
      salt,
    );

    // Create a new user entity instance and set properties explicitly
    const user = new User();
    user.id = id;
    user.email = email;
    user.password_hash = hashedPassword;
    user.userType = userType;
    user.name = name;
    user.nickname = nickname;
    user.residentRegistrationNumber_hash = hashedResidentRegistrationNumber;
    user.phoneNumber = phoneNumber;
    user.birthYear = birthYear; // Set calculated birthYear
    user.gender = gender; // Set calculated gender
    user.address = address;
    user.detailedAddress = detailedAddress;
    user.businessRegistrationNumber = businessRegistrationNumber || null;

    const savedUser = await this.usersRepository.save(user);

    // Do not return sensitive data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, residentRegistrationNumber_hash, ...result } =
      savedUser;
    return result as User;
  }

  async checkId(id: string): Promise<void> {
    const existingUser = await this.usersRepository.findOneBy({ id });
    if (existingUser) {
      throw new ConflictException('ID already exists');
    }
  }

  async checkEmail(email: string): Promise<void> {
    const existingUser = await this.usersRepository.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }

  async findOneByLoginId(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(user_no: number, updateData: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ user_no });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_no} not found`);
    }

    console.log('Before update - user.birthYear:', user.birthYear); // Added console.log

    // If residentRegistrationNumber is being updated, re-calculate birthYear and gender
    if (updateData.residentRegistrationNumber) {
      const residentRegistrationNumberWithoutHyphen = updateData.residentRegistrationNumber.replace(/-/g, '');
      const { birthYear, gender } = this.calculateAgeAndGenderFromRRN(residentRegistrationNumberWithoutHyphen);
      user.birthYear = birthYear;
      user.gender = gender;

      // Hash the new residentRegistrationNumber
      const salt = await bcrypt.genSalt();
      user.residentRegistrationNumber_hash = await bcrypt.hash(residentRegistrationNumberWithoutHyphen, salt);
      delete updateData.residentRegistrationNumber; // Remove from updateData to prevent direct merge
    }

    // Merge other existing user data with updateData
    this.usersRepository.merge(user, updateData);
    const savedUser = await this.usersRepository.save(user);

    console.log('After update - savedUser.birthYear:', savedUser.birthYear);
    console.log('After update - savedUser.age:', savedUser.age);

    return savedUser;
  }

  async findOneByUserNo(user_no: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ user_no });
  }
}