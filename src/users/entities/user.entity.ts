import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { UserRoleEnum } from '../types/user.types';

@Entity()
export class User  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: UserRoleEnum.VIEWER})
    role: UserRoleEnum
}