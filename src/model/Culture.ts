import { IsEnum, IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./User";

export enum Type {
  FRUTA = "fruta",
  LEGUME = "legume",
  VERDURA = "verdura",
}

export enum Quality {
  ALTA = "Alta",
  MEDIA = "Média",
  BAIXA = "Baixa",
}

export class mockRegion {
  id: number;
  name: string;
  fkClimate: string;
}

export class mockClimate {
  id: number;
  name: string;
  fkClimate: string;
}

@Entity("cultures")
export class Culture {
  @PrimaryGeneratedColumn("increment", {
    primaryKeyConstraintName: "culture_id",
  })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "fk_user_id" })
  fkUserId: User;

  @IsString()
  @Column("varchar", {
    length: 55,
    nullable: false,
  })
  name: string;

  @IsString()
  @Column("varchar", { length: 500, nullable: false })
  description: string;

  @IsEnum(Type)
  @Column("enum", { enum: Type, nullable: false })
  type: Type;

  @OneToOne(() => mockRegion, { nullable: false })
  @JoinColumn({ name: "fk_region", referencedColumnName: "name" })
  fkRegion: mockRegion;

  @OneToOne(() => mockClimate, { nullable: false })
  @JoinColumn({ name: "fk_favorite_climate", referencedColumnName: "name" })
  fkFavoriteClimate: mockClimate;

  @IsEnum(Quality)
  @Column("enum", { enum: Quality, nullable: false })
  quality: Quality;
}
