import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from './dto/login-auth.dto';
import { StandardResponse } from '../common/standard-response';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private logger: Logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiOperation({ summary: 'Create new User' })
  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    try {
      return new StandardResponse(
        HttpStatus.CREATED,
        'Success',
        await this.authService.create(createAuthDto),
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  @ApiOkResponse({ description: 'Return access token' })
  @ApiOperation({ summary: 'Login as a user' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginAuthDto) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        'Success',
        await this.authService.login(dto),
      );
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  @ApiOkResponse({ description: 'Return `success` as a string' })
  @ApiOperation({ summary: 'Test Authentication in development' })
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  async test() {
    return 'success';
  }
}
