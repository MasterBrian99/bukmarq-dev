import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { StandardResponse } from '../common/standard-response';
import SUCCESS_MESSAGES from '../common/success-messages';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({
    summary: 'Create New Collection',
    description: 'Create new collection inside root or root collection ',
  })
  @ApiCreatedResponse({ description: 'Return success' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    try {
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.FOLDER_CREATED_SUCCESS,
        await this.collectionService.create(createCollectionDto),
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
  // @UseGuards(AuthGuard('jwt'))
  @Get('parent')
  async findParentList() {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.findParentList(),
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
  // @UseGuards(AuthGuard('jwt'))
  @Get('children/:id')
  async findOneFromParent(@Param('id') id: string) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.collectionService.findOneFromParent(+id),
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
  @UseGuards(AuthGuard('jwt'))
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
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCollectionDto: UpdateCollectionDto,
  // ) {
  //   return this.collectionService.update(+id, updateCollectionDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.collectionService.remove(+id);
  // }
}
