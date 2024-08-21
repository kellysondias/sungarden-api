import { IsString } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Region } from "./Region";

enum Name {
  TROPICAL = "Tropical",
  SEMIARIDO = "Semiárido",
  TROPICAL_DE_SAVANA = "Tropical de Savana",
  SUBTROPICAL = "Subtropical",
  SUBTROPICAL_DE_MONTANHA = "Subtropical de Montanha",
}

@Entity("climates")
export class Climate {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column("enum", { enum: Name, nullable: false, unique: true })
  name: Name;

  @OneToOne(() => Region)
  @JoinColumn({ name: "fk_region" })
  fkRegion: Region[];
}
