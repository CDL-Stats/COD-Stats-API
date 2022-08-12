import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/teams/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    
    @ManyToOne(() => Team, team => team.players, { eager: true })
    @ApiProperty()
    @JoinColumn()
    team: Team;
}