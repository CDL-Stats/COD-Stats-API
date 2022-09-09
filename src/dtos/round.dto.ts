import { Match } from 'src/match/match.entity';
import { GameModes } from './game.dto';
import mapDTO from './map.dto';

export default class roundDTO {
  id: number;
  match: Match;
  map: mapDTO;
  game: GameModes;
}
