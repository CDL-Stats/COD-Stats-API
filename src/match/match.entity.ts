import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Team } from "src/teams/team.entity";
import { Tournament } from "src/tournament/tournament.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Tournament, tournament => tournament.match, { nullable: true})
    @JoinColumn()
    @ApiProperty()
    tournament: Tournament

    @Column()
    @ApiProperty()
    round: string

    @Column()
    @ApiProperty()
    roundID: number

    @Column()
    @ApiProperty()
    bestOf: number

    @ManyToMany(() => Team, (team) => team.matches,  { eager: true, cascade: true})
    @JoinTable()
    teams: Team[]
}