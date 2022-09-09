import { ApiProperty } from '@nestjs/swagger';
import { MatchTeam } from 'src/match-team/match-team.entity';
import { Match } from 'src/match/match.entity';
import { Player } from 'src/players/player.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import { Tournament } from 'src/tournament/tournament.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Team {
  push(teamEntity: Team) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  @ApiProperty()
  teamLocation: string;

  @Column()
  @ApiProperty()
  teamName: string;

  @Column({ nullable: true })
  @ApiProperty()
  teamLogo: string;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];

  @Column({ nullable: true })
  @ApiProperty()
  primaryColor: string;

  @Column({ nullable: true })
  @ApiProperty()
  secondaryColor: string;

  @Column({ nullable: true })
  @ApiProperty()
  shortName: string;

  @Column({ nullable: true })
  @ApiProperty()
  abbreviation: string;

  @Column({ nullable: true })
  @ApiProperty()
  twitterURL: string;

  @Column({ nullable: true })
  @ApiProperty()
  youtubeURL: string;

  @Column({ nullable: true })
  @ApiProperty()
  instagramURL: string;

  //   @ManyToMany(() => Match, (tournament) => tournament.teams)
  //   matches: Match[];

  @OneToMany(() => MatchTeam, (matchTeam) => matchTeam.team)
  matchTeam: MatchTeam[];

  @OneToMany(() => RoundTeam, (teamScore) => teamScore.team)
  teamScore: RoundTeam[];
}
