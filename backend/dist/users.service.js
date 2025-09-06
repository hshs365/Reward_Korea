"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./users/user.entity");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    calculateAgeAndGenderFromRRN(residentRegistrationNumber) {
        const yearPart = parseInt(residentRegistrationNumber.substring(0, 2), 10);
        const centuryIndicator = parseInt(residentRegistrationNumber.substring(6, 7), 10);
        let birthYear;
        let gender;
        if (centuryIndicator === 1 || centuryIndicator === 2) {
            birthYear = 1900 + yearPart;
            gender = centuryIndicator === 1 ? 'male' : 'female';
        }
        else if (centuryIndicator === 3 || centuryIndicator === 4) {
            birthYear = 2000 + yearPart;
            gender = centuryIndicator === 3 ? 'male' : 'female';
        }
        else {
            throw new Error('Invalid Resident Registration Number format for age/gender calculation.');
        }
        return { birthYear, gender };
    }
    async create(createUserDto) {
        const { id, email, password, userType, name, nickname, residentRegistrationNumber, phoneNumber, address, detailedAddress, businessRegistrationNumber, } = createUserDto;
        const existingUserById = await this.usersRepository.findOneBy({ id });
        if (existingUserById) {
            throw new common_1.ConflictException('ID already exists');
        }
        const existingUserByEmail = await this.usersRepository.findOneBy({ email });
        if (existingUserByEmail) {
            throw new common_1.ConflictException('Email already exists');
        }
        const existingUserByNickname = await this.usersRepository.findOneBy({ nickname });
        if (existingUserByNickname) {
            throw new common_1.ConflictException('Nickname already exists');
        }
        const existingUserByPhoneNumber = await this.usersRepository.findOneBy({ phoneNumber });
        if (existingUserByPhoneNumber) {
            throw new common_1.ConflictException('Phone number already exists');
        }
        const { birthYear, gender } = this.calculateAgeAndGenderFromRRN(residentRegistrationNumber);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedResidentRegistrationNumber = await bcrypt.hash(residentRegistrationNumber, salt);
        const user = new user_entity_1.User();
        user.id = id;
        user.email = email;
        user.password_hash = hashedPassword;
        user.userType = userType;
        user.name = name;
        user.nickname = nickname;
        user.residentRegistrationNumber_hash = hashedResidentRegistrationNumber;
        user.phoneNumber = phoneNumber;
        user.birthYear = birthYear;
        user.gender = gender;
        user.address = address;
        user.detailedAddress = detailedAddress;
        user.businessRegistrationNumber = businessRegistrationNumber || null;
        const savedUser = await this.usersRepository.save(user);
        const { password_hash, residentRegistrationNumber_hash, ...result } = savedUser;
        return result;
    }
    async checkId(id) {
        const existingUser = await this.usersRepository.findOneBy({ id });
        if (existingUser) {
            throw new common_1.ConflictException('ID already exists');
        }
    }
    async checkEmail(email) {
        const existingUser = await this.usersRepository.findOneBy({ email });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
    }
    async findOneByLoginId(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async findOneByEmail(email) {
        return this.usersRepository.findOneBy({ email });
    }
    async update(user_no, updateData) {
        const user = await this.usersRepository.findOneBy({ user_no });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${user_no} not found`);
        }
        console.log('Before update - user.birthYear:', user.birthYear);
        if (updateData.residentRegistrationNumber) {
            const residentRegistrationNumberWithoutHyphen = updateData.residentRegistrationNumber.replace(/-/g, '');
            const { birthYear, gender } = this.calculateAgeAndGenderFromRRN(residentRegistrationNumberWithoutHyphen);
            user.birthYear = birthYear;
            user.gender = gender;
            const salt = await bcrypt.genSalt();
            user.residentRegistrationNumber_hash = await bcrypt.hash(residentRegistrationNumberWithoutHyphen, salt);
            delete updateData.residentRegistrationNumber;
        }
        this.usersRepository.merge(user, updateData);
        const savedUser = await this.usersRepository.save(user);
        console.log('After update - savedUser.birthYear:', savedUser.birthYear);
        console.log('After update - savedUser.age:', savedUser.age);
        return savedUser;
    }
    async findOneByUserNo(user_no) {
        return this.usersRepository.findOneBy({ user_no });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map