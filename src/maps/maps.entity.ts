import { Round } from 'src/round/round.entity';
import { Season } from 'src/season/season.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Map {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Season, (season) => season.map)
  @JoinColumn()
  season: Season;

  @OneToMany(() => Round, (round) => round.map)
  round: Round[];
}
