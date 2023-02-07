import {ApiProperty} from "@nestjs/swagger";

export class CreateFolderDto{

    @ApiProperty({type:Number, description:'root folder id.must be 0 if it is root'})
    rootId:number

    @ApiProperty({type:String,description:'Folder Name'})
    name:string
}