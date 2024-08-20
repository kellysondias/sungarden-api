import { IsString } from "class-validator";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

class mockRegion {
  id: number;
  name: string;
  fkClimate: string;
}

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

  @OneToOne(() => mockRegion, { nullable: false })
  @JoinColumn({ name: "fk_climate", referencedColumnName: "name" })
  fkClimate: mockRegion;
}
