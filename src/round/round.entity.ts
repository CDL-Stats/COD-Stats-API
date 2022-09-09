import { GameModes } from 'src/dtos/game.dto';
import { Map } from 'src/maps/maps.entity';
import { Match } from 'src/match/match.entity';
import { RoundPlayer } from 'src/round-player/round-player.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Round {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, (match) => match.round)
  match: Match;

  @ManyToOne(() => Map, (map) => map.round)
  map: Map;

  @Column()
  game: GameModes;

  @OneToMany(() => RoundTeam, (roundteam) => roundteam.round)
  teamScore: RoundTeam[];
}
