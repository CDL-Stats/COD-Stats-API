import { Team } from 'src/teams/team.entity';
import { Tournament } from 'src/tournament/tournament.entity';

export default class matchDTO {
  id: number;
  tournament: Tournament;
  tournamentRound: string;
  roundID: number;
  bestOf: number;
  teams: [];
}
