import { IsString } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
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
  @Column("enum", { enum: Name, nullable: false })
  name: Name;

  @OneToOne(() => Region, { nullable: false })
  @JoinColumn({ name: "fk_region", referencedColumnName: "name" })
  fkRegion: Region;
}
