import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Team } from '../teams/team.entity';

export class UpdateTeamDTO {
  slug: string;
  teamName?: string;
  teamLocation?: string;
  teamURL?: string;
  primaryColor?: string;
  secondaryColor?: string;
  shortName?: string;
  abbreviation?: string;
  twitterURL?: string;
  youtubeURL?: string;
  instagramURL?: string;
  picture?: string;
}

export default UpdateTeamDTO;
