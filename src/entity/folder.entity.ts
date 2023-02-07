import { BaseEntity } from './base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'folder' })
@Tree('materialized-path')
export class FolderEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: '50', nullable: false })
  name: string;

  @ManyToOne(() => FolderEntity, (folderEntity) => folderEntity.id, {
    nullable: true,
  })
  @TreeChildren()
  children: FolderEntity[];
  @TreeParent()
  parent: FolderEntity;
}
