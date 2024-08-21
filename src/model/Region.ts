import { IsString } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Climate } from "./Climate";

enum Name {
  NORTE = "Norte",
  NORDESTE = "Nordeste",
  CENTRO_OESTE = "Centro-Oeste",
  SUDESTE = "Sudeste",
  SUL = "Sul",
}

@Entity("regions")
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column("enum", { enum: Name, nullable: false, unique: true })
  name: Name;

  @OneToOne(() => Climate)
  @JoinColumn({ name: "fk_climate", referencedColumnName: "name" })
  fkClimate: Climate;
}
