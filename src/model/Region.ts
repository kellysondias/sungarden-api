import { IsString } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

class mockClimate {
  id: number;
  name: string;
  fkRegion: string;
}

enum Name {
  TROPICAL = "Tropical",
  SEMIARIDO = "Semiárido",
  TROPICAL_DE_SAVANA = "Tropical de Savana",
  SUBTROPICAL = "Subtropical",
  SUBTROPICAL_DE_MONTANHA = "Subtropical de Montanha",
}

@Entity("regions")
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column("enum", { enum: Name, nullable: false })
  name: Name;

  @OneToOne(() => mockClimate, { nullable: false })
  @JoinColumn({ name: "fk_climate", referencedColumnName: "name" })
  fkClimate: mockClimate;
}
