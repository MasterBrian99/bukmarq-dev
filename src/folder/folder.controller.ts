import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StandardResponse } from '../common/standard-response';
import SUCCESS_MESSAGES from '../common/success-messages';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiOperation({
    summary: 'Create New Folder',
    description: 'Create new folder inside root or root folder ',
  })
  @ApiCreatedResponse({ description: 'Return success' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateFolderDto) {
    try {
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.FOLDER_CREATED_SUCCESS,
        await this.folderService.create(dto),
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'Get Folder List',
    description: 'Get folder with tree structure ',
  })
  @ApiCreatedResponse({ description: 'Return List' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.folderService.findAll(),
      );
    } catch (e) {
      throw e;
    }
  }
}
