export declare class User {
    user_no: number;
    id: string;
    email: string;
    password_hash: string;
    userType: string;
    name: string;
    nickname: string;
    residentRegistrationNumber_hash: string;
    phoneNumber: string;
    birthYear: number;
    gender: string;
    get age(): number | null;
    address: string;
    detailedAddress: string;
    social_provider: string;
    social_id: string;
    profilePicture: string;
    businessRegistrationNumber: string | null;
}
