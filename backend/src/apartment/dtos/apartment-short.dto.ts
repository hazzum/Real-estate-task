import { ApiProperty } from '@nestjs/swagger';
import { ApartmentStatus } from '@prisma/client';

export class ApartmentShortDto {
  @ApiProperty({
    example: 'ckg67kf6e0007wtz6nmf28k1h',
    description: 'The unique identifier for the apartment',
  })
  id: string;

  @ApiProperty({
    example: 'Cozy Apartment in the city',
    description: 'The title of the apartment',
  })
  title: string;

  @ApiProperty({
    example: 1500,
    description: 'The square footage of the apartment',
  })
  sqft: number;

  @ApiProperty({ example: 2, description: 'The number of bedrooms' })
  bdrooms: number;

  @ApiProperty({ example: 1, description: 'The number of bathrooms' })
  bthrooms: number;

  @ApiProperty({ example: 250000, description: 'The listed price of the apartment' })
  price: number;

  @ApiProperty({
    enum: ApartmentStatus,
    example: ApartmentStatus.NEW,
    description: 'The status of the apartment',
  })
  status: ApartmentStatus;
}
