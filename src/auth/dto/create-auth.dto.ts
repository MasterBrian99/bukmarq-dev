import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property.use unique a `username`',
  })
  username: string;

  @ApiProperty({
    type: String,
    description:
      "Please use a secure password.i didn't spend lot of time for security ",
  })
  password: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'This is an optional property.use this if you configured email client',
  })
  email: string;
}
