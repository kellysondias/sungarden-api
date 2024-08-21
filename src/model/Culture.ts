import { IsEnum, IsString } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Region } from "./Region";
import { Climate } from "./Climate";

enum Type {
  FRUTA = "fruta",
  LEGUME = "legume",
  VERDURA = "verdura",
}

enum Quality {
  ALTA = "Alta",
  MEDIA = "Média",
  BAIXA = "Baixa",
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

  @OneToOne(() => Region, { nullable: false })
  @JoinColumn({ name: "fk_region" })
  fkRegion: Region;

  @OneToOne(() => Climate, { nullable: false })
  @JoinColumn({ name: "fk_favorite_climate" })
  fkFavoriteClimate: Climate;

  @IsEnum(Quality)
  @Column("enum", { enum: Quality, nullable: false })
  quality: Quality;
}
