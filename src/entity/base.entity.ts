import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { STATUS } from '../util/constant';
import { RequestContext } from 'nestjs-request-context';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({
    name: 'status',
    type: 'int',
    enum: STATUS,
    default: STATUS.ACTIVE,
  })
  status: STATUS;

  @Column({ name: 'created_by', nullable: true, type: 'int' })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true, type: 'int' })
  updatedBy: number;

  @BeforeInsert()
  setCreatedBy() {
    // Set the createdBy field to the id of the authenticated user
    const req: any = RequestContext.currentContext.req;
    console.log(req.user);
    if (req.user) {
      this.createdBy = req.user.id;
    }
  }

  @BeforeUpdate()
  setUpdatedBy() {
    // Set the updatedBy field to the id of the authenticated user
    // this.updatedBy = getAuthenticatedUserId();
    const req: any = RequestContext.currentContext.req;
    if (req.user) {
      this.updatedBy = req.user.id;
    }
  }
}
