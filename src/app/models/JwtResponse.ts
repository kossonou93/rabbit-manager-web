export interface JwtResponse<T> {
    token: string;
    user: T;
  }
  