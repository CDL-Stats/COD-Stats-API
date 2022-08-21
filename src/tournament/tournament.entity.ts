import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}