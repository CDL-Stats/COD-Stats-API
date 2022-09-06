import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { MatchTeam } from 'src/match-team/match-team.entity';
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
  round: string;

  @Column()
  @ApiProperty()
  roundID: number;

  @Column()
  @ApiProperty()
  bestOf: number;

  @OneToMany(() => MatchTeam, (matchTeam) => matchTeam.match)
  matchTeam: MatchTeam[];
}
