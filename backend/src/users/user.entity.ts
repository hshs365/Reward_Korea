import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_no: number;

  @Column({ unique: true })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ default: 'NORMAL' })
  userType: string; // 'NORMAL' or 'NPC'

  @Column()
  name: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  residentRegistrationNumber_hash: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  birthYear: number;

  @Column()
  gender: string;

  // Dynamic age calculation
  get age(): number | null {
    if (this.birthYear === null || this.birthYear === undefined) {
      return null;
    }
    const currentYear = new Date().getFullYear();
    return (currentYear - this.birthYear) + 1; // Korean age
  }

  @Column()
  address: string;

  @Column()
  detailedAddress: string;

  @Column({ nullable: true })
  social_provider: string;

  @Column({ nullable: true })
  social_id: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  businessRegistrationNumber: string | null;
}