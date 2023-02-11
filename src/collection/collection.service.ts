import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CollectionEntity } from '../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { GetListCollectionDto } from './dto/get-list-collection.dto';
import { GetCollectionDto } from './dto/get-collection.dto';
import ERROR_MESSAGES from '../common/error-messages';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    private readonly dataSource: DataSource,
  ) {}
  async create(dto: CreateCollectionDto) {
    try {
      const collection = new CollectionEntity();
      collection.name = dto.name;
      if (dto.parentId > 0) {
        const parentCollection = await this.collectionRepository.findOne({
          where: {
            id: dto.parentId,
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

  async findParentList() {
    const treeList = await this.dataSource.manager
      .getTreeRepository(CollectionEntity)
      .findRoots();
    return new GetListCollectionDto(treeList).getList();
  }

  async findOneFromParent(id: number) {
    const child = await this.collectionRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['children'],
      select: ['children'],
    });

    return new GetCollectionDto(child).get();
  }
}
