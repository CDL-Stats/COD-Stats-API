import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { match } from "assert";
import { Match } from "src/match/match.entity";
import { Season } from "src/season/season.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum tournamentType {
    regular_season = 'Regular Season',
    pre_season = 'Pre-Season',
    post_season = 'Post-Season'
  }

@Entity()
export class Tournament{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    type: tournamentType

    @Column()
    @ApiProperty()
    startDate: Date

    @Column()
    @ApiProperty()
    endDate: Date

    @Column()
    @ApiProperty()
    name: string

    @Column({ nullable: true })
    @ApiProperty()
    teamSize: number

    @Column({ nullable: true })
    @ApiProperty()
    purseSize: number

    @Column({ nullable: true })
    @ApiProperty()
    city: string

    @ManyToOne(() => Season, season => season.tournaments, { nullable: true })
    @JoinColumn({name: "season_id",})
    @ApiProperty()
    season: Season

    @OneToMany(() => Match, (match) => match.tournament, {cascade: true})
    match: Match[]
}