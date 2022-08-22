import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Tournament } from "src/tournament/tournament.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Season {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    year: number;

    @Column()
    @ApiProperty()
    title: string;

    @OneToMany(() => Tournament, (tournament) => tournament.season)
    tournaments: Tournament[]
}