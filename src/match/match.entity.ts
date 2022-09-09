import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { MatchTeam } from 'src/match-team/match-team.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import { Round } from 'src/round/round.entity';
import { Team } from 'src/teams/team.entity';
import { Tournament } from 'src/tournament/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.match, {
    nullable: true,
  })
  @JoinColumn()
  @ApiProperty()
  tournament: Tournament;

  @Column()
  @ApiProperty()
  tournamentRound: string;

  @Column()
  @ApiProperty()
  roundID: number;

  @Column()
  @ApiProperty()
  bestOf: number;

  @OneToMany(() => MatchTeam, (matchTeam) => matchTeam.match)
  matchTeam: MatchTeam[];

  @OneToMany(() => RoundTeam, (matchTeam) => matchTeam.match)
  teamScore: RoundTeam[];

  @OneToMany(() => Round, (round) => round.match)
  round: Round[];
}
