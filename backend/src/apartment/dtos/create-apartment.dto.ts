import { ApiProperty } from '@nestjs/swagger';
import { ApartmentStatus } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApartmentDto {
  @ApiProperty({
    required: true,
    default: null,
    type: String,
    example: 'Beautiful Waterfront Property at a Great Price',
    description: 'The title of the property',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    default: null,
    type: Number,
    example: 199999.99,
    description: 'The listed price of the property',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty({
    required: true,
    default: null,
    enum: ApartmentStatus,
    example: ApartmentStatus.SOLD,
    description: 'The status of the property',
  })
  @IsString()
  status: ApartmentStatus;

  @ApiProperty({
    required: false,
    default: null,
    type: String,
    example: '15D 5th Blvd.',
    description: 'Address of the property',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    required: false,
    default: null,
    type: String,
    example:
      'Take Exit 23 off the highway. Turn right onto Maple St. Drive 2 miles, then turn left onto Oak Dr. House is the third on the right, #45, with a blue door.',
    description: 'Directions to the property',
  })
  @IsOptional()
  @IsString()
  directions?: string;

  @ApiProperty({
    required: false,
    default: null,
    type: String,
    example:
      'Charming 3-bedroom, 2-bath home nestled in a quiet cul-de-sac. Features include an open-concept living area, updated kitchen with granite countertops, spacious master suite with walk-in closet',
    description: 'Description of the property',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    default: null,
    type: Boolean,
    example: false,
    description: 'Flag to indicate whether this property has a pool',
  })
  @IsOptional()
  @IsBoolean()
  pool?: boolean;

  @ApiProperty({
    required: false,
    default: null,
    type: Boolean,
    example: true,
    description: 'Flag to indicate whether this property has a waterfront view'
  })
  @IsOptional()
  @IsBoolean()
  waterfront?: boolean;

  @ApiProperty({
    required: true,
    default: null,
    type: Number,
    example: 2,
    description: 'The number of bathrooms',
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  bthrooms: number;

  @ApiProperty({
    required: true,
    default: null,
    type: Number,
    example: 4,
    description: 'The number of bedrooms',
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  bdrooms: number;

  @ApiProperty({
    required: true,
    default: null,
    type: Number,
    example: 1320.5,
    description: 'The square footage of the property',
  })
  @IsNumber({ maxDecimalPlaces: 1 })
  sqft: number;
}
