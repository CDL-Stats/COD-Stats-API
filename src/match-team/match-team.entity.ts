import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Match } from 'src/match/match.entity';
import { Team } from 'src/teams/team.entity';
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
export class MatchTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.matchTeam)
  @ApiProperty()
  team: Team;

  @ManyToOne(() => Match, (match) => match.matchTeam, { onDelete: 'CASCADE' })
  @ApiProperty()
  match: Match;
}
