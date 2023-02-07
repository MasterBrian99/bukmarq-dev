import { FolderEntity } from '../../entity';

export class FindAllFolderDto {
  list: FolderEntity[];

  constructor(list: FolderEntity[]) {
    this.list = list;
  }

  getList() {
    return this.list;
  }
}
