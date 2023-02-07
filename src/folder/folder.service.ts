import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FolderEntity } from '../entity';
import { DataSource, Repository } from 'typeorm';
import ERROR_MESSAGES from '../common/error-messages';
import { FindAllFolderDto } from './dto/find-all-folder.dto';

@Injectable()
export class FolderService {
  private logger: Logger = new Logger(FolderService.name);

  constructor(
    @InjectRepository(FolderEntity)
    private folderRepository: Repository<FolderEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateFolderDto) {
    try {
      const folder = new FolderEntity();
      this.logger.log({ dto });
      folder.name = dto.name;
      if (dto.rootId > 0) {
        const rootFolder = await this.folderRepository.findOne({
          where: {
            id: dto.rootId,
          },
        });
        if (rootFolder) {
          folder.parent = rootFolder;
        }
      }
      await this.folderRepository.save(folder);
      return;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const treeList = await this.dataSource.manager
      .getTreeRepository(FolderEntity)
      .findTrees();
    return new FindAllFolderDto(treeList).getList();
    // const tre=await this.folderRepository.find
    // return await this.folderRepository.findT
  }
}
