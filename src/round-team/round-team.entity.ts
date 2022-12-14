import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Match } from 'src/match/match.entity';
import { RoundPlayer } from 'src/round-player/round-player.entity';
import { Round } from 'src/round/round.entity';
import { Team } from 'src/teams/team.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RoundTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, (match) => match.teamScore)
  @ApiProperty()
  match: Match;

  @ManyToOne(() => Round, (round) => round.teamScore, { onDelete: 'CASCADE' })
  @ApiProperty()
  round: Round;

  @ManyToOne(() => Team, (team) => team.teamScore)
  @ApiProperty()
  team: Team;

  @OneToMany(() => RoundPlayer, (rp) => rp.roundTeam)
  playerRound: RoundPlayer;

  @Column()
  score: number;

  @Column({ nullable: true })
  WL: boolean;
}
