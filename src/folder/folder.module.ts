import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderEntity } from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature([FolderEntity])],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
