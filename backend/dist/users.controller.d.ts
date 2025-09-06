import { UsersService } from './users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./users/user.entity").User>;
    checkId(id: string): Promise<void>;
    checkEmail(email: string): Promise<void>;
    updateProfile(req: any, updateData: UpdateUserDto): Promise<import("./users/user.entity").User>;
}
