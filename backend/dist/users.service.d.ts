import { Repository } from 'typeorm';
import { User } from './users/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    private calculateAgeAndGenderFromRRN;
    create(createUserDto: CreateUserDto): Promise<User>;
    checkId(id: string): Promise<void>;
    checkEmail(email: string): Promise<void>;
    findOneByLoginId(id: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    update(user_no: number, updateData: UpdateUserDto): Promise<User>;
    findOneByUserNo(user_no: number): Promise<User | null>;
}
