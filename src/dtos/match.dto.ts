import { Team } from "src/teams/team.entity";
import { Tournament } from "src/tournament/tournament.entity"

export default class matchDTO{
    id: number;
    tournament: Tournament;
    round: string;
    roundID: number;
    bestOf: number;
    teams: [];
}