import { Persona } from 'models/users/persona.enum';
import { Role } from 'models/users/role.enum';

export class QueryParams {
  query?: string;
  page?: number;
  personas?: Persona[];
  limit: number = 50;
  role?: Role;
  afterCursor?: string | null;
  beforeCursor?: string | null;
  isPublished?: boolean;
  modulus?: number | null;
  useAbility?: boolean;
  region?: string;
}

export class InspireImageQueryParams extends QueryParams {
  tags?: Array<string>;
  keywords?: Array<string>;
  currentImageId?: string;
}
