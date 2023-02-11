import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entity';
import * as process from 'process';
import ERROR_MESSAGES from '../common/error-messages';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}
  async create(dto: CreateAuthDto) {
    const alreadyExist = await this.userRepository.findOne({
      where: {
        username: dto.username,
      },
    });
    if (alreadyExist) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXIST_ERROR);
    }
    try {
      const user = new UserEntity();
      user.username = dto.username;
      user.email = dto.email;
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(dto.password, salt);
      const savedUser = await this.userRepository.save(user);
      const payload = { username: dto.username, id: savedUser.id };
      return {
        access_token: this.jwt.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(dto: LoginAuthDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: dto.username,
        },
      });
      const payload = { username: dto.username, id: user.id };
      return {
        access_token: this.jwt.sign(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch (e) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }

      return null;
    }
    return null;
  }
}
