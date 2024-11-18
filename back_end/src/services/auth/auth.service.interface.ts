import { JwtDto } from '../../adapter/dtos/auth/jwt.dto';
import { LoginEmailDto } from '../../adapter/dtos/auth/login-email.dto';
import { RegisterDto } from '../../adapter/dtos/auth/register.dto';
import { UserDomain } from '../../domain/user.domain';

export interface AuthServiceInterface {
  loginEmail: (data: LoginEmailDto) => Promise<UserDomain | JwtDto | null>;

  register: (data: RegisterDto) => Promise<any>;

  getTokenData: (data: any) => Promise<any>;
}
