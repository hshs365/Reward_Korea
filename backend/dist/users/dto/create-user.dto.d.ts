export declare enum UserType {
    NORMAL = "NORMAL",
    NPC = "NPC"
}
export declare enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}
export declare class CreateUserDto {
    id: string;
    email: string;
    password: string;
    userType: UserType;
    name: string;
    nickname: string;
    residentRegistrationNumber: string;
    phoneNumber: string;
    address: string;
    detailedAddress: string;
    businessRegistrationNumber?: string;
}
