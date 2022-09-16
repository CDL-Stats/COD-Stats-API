import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Player } from 'src/players/player.entity';
import { RoundTeam } from 'src/round-team/round-team.entity';
import { Round } from 'src/round/round.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoundPlayer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerRound)
  @ApiProperty()
  player: Player;

  @ManyToOne(() => RoundTeam, (roundTeam) => roundTeam.playerRound, {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  roundTeam: RoundTeam;

  @Column()
  kills: number;

  @Column()
  deaths: number;

  @Column()
  assists: number;

  @Column()
  nonTradedKills: number;

  @Column()
  highestStreak: number;

  @Column()
  damage: number;

  @Column({ nullable: true })
  hillTime: number;

  @Column({ nullable: true })
  p1Time: number;

  @Column({ nullable: true })
  p2Time: number;

  @Column({ nullable: true })
  p3Time: number;

  @Column({ nullable: true })
  p4Time: number;

  @Column({ nullable: true })
  p5Time: number;

  @Column({ nullable: true })
  firstBloods: number;

  @Column({ nullable: true })
  plants: number;

  @Column({ nullable: true })
  defuses: number;

  @Column({ nullable: true })
  zoneCaptures: number;

  @Column({ nullable: true })
  zoneTiersCaptured: number;
}
