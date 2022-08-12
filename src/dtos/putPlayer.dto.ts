import { Exclude, Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Team } from "../teams/team.entity";

 
export class UpdatePlayerDTO {
  id?: number;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  team?: Team;
}
 
export default UpdatePlayerDTO;