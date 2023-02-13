import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { StandardResponse } from '../common/standard-response';
import SUCCESS_MESSAGES from '../common/success-messages';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from '../auth/user.decorator';
import { UserEntity } from '../entity';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('collection')
@UseGuards(AuthGuard('jwt'))
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({
    summary: 'Create New Collection',
    description: 'Create new collection inside root or root collection ',
  })
  @ApiCreatedResponse({ description: 'Return success' })
  @Post()
  async create(
    @Auth() user: UserEntity,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    try {
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.FOLDER_CREATED_SUCCESS,
        await this.collectionService.create(user, createCollectionDto),
      );
    } catch (e) {
      throw e;
    }
  }
  @ApiOperation({
    summary: 'Get Parent  List',
    description: 'Get Parent  List ',
  })
  @ApiCreatedResponse({ description: 'Return List' })
  @Get('parent')
  async findParentList(@Auth() user: UserEntity) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.findParentList(user),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Get Children Collection  List',
    description:
      'Get Children Collection List from parent id as tree structure ',
  })
  @ApiCreatedResponse({ description: 'Return List' })
  @Get('children/:id')
  async findOneFromParent(@Auth() user: UserEntity, @Param('id') id: string) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.findOneFromParent(user, +id),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Get Collection List',
    description: 'Get collection with tree structure ',
  })
  @ApiCreatedResponse({ description: 'Return List' })
  @Get()
  async findAll() {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.findAll(),
      );
    } catch (e) {
      throw e;
    }
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.collectionService.findOne(+id);
  // }
  //
  @ApiOperation({
    summary: 'Update Collection Parent',
  })
  @ApiOkResponse({ description: 'Return Success' })
  @Put('parent')
  async updateParent(@Body() updateCollectionDto: UpdateCollectionDto) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.updateParent(updateCollectionDto),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Update collection emoji',
  })
  @ApiOkResponse({ description: 'Return Success' })
  @Put('emoji')
  async updateEmoji(@Body() updateCollectionDto: UpdateCollectionDto) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.updateEmoji(updateCollectionDto),
      );
    } catch (e) {
      throw e;
    }
  }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.collectionService.remove(+id);
  // }
}
