import { ApiProperty } from '@nestjs/swagger';
import { PlayerHistory } from 'src/player-history/player-history.entity';
import { RoundPlayer } from 'src/round-player/round-player.entity';
import { Team } from 'src/teams/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum primaryWeapons {
  AR = 'AR',
  Sub = 'Sub',
}

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  nickName: string;

  @ManyToOne(() => Team, (team) => team.players, { eager: true })
  @ApiProperty()
  team: Team;

  @Column({ nullable: true })
  @ApiProperty()
  active: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  pictureURL: string;

  @Column({ nullable: true })
  @ApiProperty()
  primaryWeapon: primaryWeapons;

  @Column({ nullable: true })
  @ApiProperty()
  birthDate: Date;

  @Column({ nullable: true })
  @ApiProperty()
  twitchURL: string;

  @Column({ nullable: true })
  @ApiProperty()
  youtubeURL: string;

  @Column({ nullable: true })
  @ApiProperty()
  instagramURL: string;

  @Column({ nullable: true })
  @ApiProperty()
  twitterURL: string;

  @Column({ nullable: true })
  @ApiProperty()
  country: string;

  @OneToMany(() => RoundPlayer, (roundteam) => roundteam.player)
  playerRound: RoundPlayer[];

  @OneToMany(() => PlayerHistory, (playerHistory) => playerHistory.player)
  playerHistory: PlayerHistory[];
}
