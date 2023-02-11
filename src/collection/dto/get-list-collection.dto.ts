import { CollectionEntity } from '../../entity';

export class GetListCollectionDto {
  list: CollectionEntity[];

  constructor(list: CollectionEntity[]) {
    this.list = list;
  }

  getList() {
    return this.list.map((elem) => ({
      id: elem.id,
      name: elem.name,
    }));
  }
}
