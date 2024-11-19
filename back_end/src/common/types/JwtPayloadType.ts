export interface JwtPayloadType {
  id: number;
  email: string;
  username?: string;
  iat?: number;
  exp?: number;
}
