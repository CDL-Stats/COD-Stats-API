import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { primaryWeapons } from 'src/players/player.entity';
import { Team } from '../teams/team.entity';

export class UpdatePlayerDTO {
  id: number;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  team?: Team;
  active?: boolean;
  primaryWeapon?: primaryWeapons;
  birthDate?: Date;
  twitchURL?: string;
  youtubeURL?: string;
  instagramURL?: string;
  twitterURL?: string;
  country?: string;
  picture?: string;
}

export default UpdatePlayerDTO;
