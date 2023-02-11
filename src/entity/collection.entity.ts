import { BaseEntity } from './base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'collection' })
@Tree('materialized-path')
export class CollectionEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: '50', nullable: false })
  name: string;

  @ManyToOne(
    () => CollectionEntity,
    (collectionEntity) => collectionEntity.id,
    {
      nullable: true,
    },
  )
  @TreeChildren()
  children: CollectionEntity[];
  @TreeParent()
  parent: CollectionEntity;
}
