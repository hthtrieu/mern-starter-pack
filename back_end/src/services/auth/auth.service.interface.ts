import { JwtPayloadDto } from '../../adapter/dtos/auth/jwt-payload.dto';
import { JwtDto } from '../../adapter/dtos/auth/jwt.dto';
import { LoginEmailDto } from '../../adapter/dtos/auth/login-email.dto';
import { RegisterDto } from '../../adapter/dtos/auth/register.dto';
import { UserDomain } from '../../domain/user.domain';

export interface AuthServiceInterface {
  loginEmail: (data: LoginEmailDto) => Promise<JwtDto | null>;

  register: (data: RegisterDto) => Promise<any>;

  getTokenData: (data: JwtPayloadDto) => Promise<JwtDto>;
}
