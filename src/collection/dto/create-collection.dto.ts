import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({
    type: Number,
    description: 'parent folder id.must be 0 if it is root',
  })
  parentId: number;

  @ApiProperty({ type: String, description: 'Folder Name' })
  name: string;
}
