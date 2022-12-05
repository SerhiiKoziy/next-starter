import { User } from '../users/user.class';

export interface LoginResponse {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly user: User;
  readonly moodboardId?: string;
}
