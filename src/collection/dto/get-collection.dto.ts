import { CollectionEntity } from '../../entity';

export class GetCollectionDto {
  item: CollectionEntity;

  constructor(item: CollectionEntity) {
    this.item = item;
  }
  get() {
    if (this.item.children.length > 0) {
      return this.item.children.map((elem) => ({
        id: elem.id,
        name: elem.name,
      }));
    }
    return [];
  }
}
