import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    UserName: string;

    @Column()
    Bio: string;

    @Column()
    DateOfBirth: Date;

    @Column()
    Hobbies: string;

    @Column()
    Role: string;

    @Column()
    ProfilePic: string;

}
