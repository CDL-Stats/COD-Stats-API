import { Exclude, Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Tournament, tournamentType } from "src/tournament/tournament.entity";

export class tournamentDTO {
  id: number;
  name: string;
  type?: tournamentType;
  startDate?: Date;
  endDate?: string;
  teamSize?: number;
  purseSize?: number;
  city?: string;
}
export default tournamentDTO;