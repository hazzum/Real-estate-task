import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateApartmentDto } from './create-apartment.dto';

export class UpdateApartmentDto extends CreateApartmentDto {
  @ApiProperty({
    required: false,
    type: String,
    example: 'clp93rulx00003b73mmbtrfpq',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  id: string;
}
