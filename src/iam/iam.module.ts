import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import { RolesGuard } from './authorization/guards/roles/roles.guard';
import { OtpAuthenticationService } from './authentication/otp-authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()), 
    ConfigModule.forFeature(jwtConfig)
   
  ],
  providers: [{
    provide: HashingService,
    useClass: BcryptService,
  }, 
  {
    provide: APP_GUARD,
    useClass: AuthenticationGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  AccessTokenGuard,
  RefreshTokenIdsStorage,
  AuthenticationService,
  OtpAuthenticationService,],
  controllers: [AuthenticationController]
})
export class IamModule { }
