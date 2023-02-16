import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CollectionEntity, UserEntity } from '../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { GetListCollectionDto } from './dto/get-list-collection.dto';
import { GetCollectionDto } from './dto/get-collection.dto';
import ERROR_MESSAGES from '../common/error-messages';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  private logger: Logger = new Logger(CollectionService.name);

  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    private readonly dataSource: DataSource,
  ) {}
  async create(currentUser: UserEntity, dto: CreateCollectionDto) {
    try {
      const collection = new CollectionEntity();
      collection.name = dto.name;
      if (dto.parentId > 0) {
        const parentCollection = await this.collectionRepository.findOne({
          where: {
            id: dto.parentId,
            createdBy: currentUser.id,
          },
        });
        if (parentCollection) {
          collection.parent = parentCollection;
        }
      }
      await this.collectionRepository.save(collection);
      return;
    } catch (e) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const treeList = await this.dataSource.manager
      .getTreeRepository(CollectionEntity)
      .findTrees();
    return new GetListCollectionDto(treeList).getList();
  }

  async findParentList(currentUser: UserEntity) {
    // const treeList = await this.dataSource.manager
    //   .getTreeRepository(CollectionEntity)
    //   .findRoots();
    try {
      const list = await this.collectionRepository.find({
        where: {
          parent: IsNull(),
          createdBy: currentUser.id,
        },
      });
      this.logger.log(list);
      return new GetListCollectionDto(list).getList();
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneFromParent(currentUser: UserEntity, id: number) {
    try {
      const child = await this.collectionRepository.findOneOrFail({
        where: {
          id,
          createdBy: currentUser.id,
        },
        relations: ['children'],
        select: ['children'],
      });
      if (child) {
        return new GetCollectionDto(child).get();
      }
      return [];
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateParent(dto: UpdateCollectionDto) {
    // const collection=await this.collectionRepository.findOne()
    try {
      const parentCollection = await this.collectionRepository.findOne({
        where: {
          id: dto.parentId,
        },
      });

      await this.collectionRepository.update(
        { id: dto.collectionId },
        { parent: { id: parentCollection ? parentCollection.id : null } },
      );
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateEmoji(dto: UpdateCollectionDto) {
    try {
      await this.collectionRepository.update(
        { id: dto.collectionId },
        { unified: dto.unified },
      );
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
