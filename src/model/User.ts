import { IsEmail, IsString, Length, Matches } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Culture } from "./Culture";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(3, 16)
  @Column({ length: 16 })
  firstName: string;

  @IsString()
  @Length(3, 16)
  @Column({ length: 16 })
  lastName: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Length(6, 100)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/, {
    message: "Password too weak",
  })
  @Column()
  password: string;

  @OneToMany(() => Culture, (user) => user.id)
  cultures: Culture[];
}
