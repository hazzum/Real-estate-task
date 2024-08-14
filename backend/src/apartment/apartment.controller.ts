import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApartmentService } from './apartment.service';
import {
  ApartmentShortDto,
  CreateApartmentDto,
  PaginationDto,
  UpdateApartmentDto,
} from './dtos';

@ApiTags('Apartments')
@Controller('apartments')
export class ApartmentController {
  private readonly logger = new Logger(ApartmentController.name);
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @ApiBody({
    description: 'Create apartment request body',
    type: CreateApartmentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The apartment has been successfully created.',
    type: UpdateApartmentDto,
  })
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.createApartment(createApartmentDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'List of apartments',
    type: [ApartmentShortDto],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
    description: 'Page number, default 1',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    example: 10,
    description: 'Page size, default 10',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    const { page = 1, size = 10 } = paginationDto;
    return this.apartmentService.findAll(page, size);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Apartment id',
  })
  @ApiResponse({
    status: 201,
    description: 'Apartment Details',
    type: UpdateApartmentDto,
  })
  @ApiNotFoundResponse({
    description: 'Apartment does not exist',
  })
  async findApartmentById(@Param('id') id: string) {
    const apartment = await this.apartmentService.findApartmentById(id);

    if (!apartment) {
      const exception = new NotFoundException(
        `Apartment with id: ${id} does not exist`,
      );
      this.logger.error(
        {
          message: exception.message,
          statusCode: exception.getStatus(),
        },
        exception.stack,
      );
      throw exception;
    }

    return apartment;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'Apartment id',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'The apartment has been successfully updated.',
    type: UpdateApartmentDto,
  })
  @ApiNotFoundResponse({
    description: 'Apartment does not exist',
  })
  update(
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
  ) {
    return this.apartmentService.updateApartment(id, updateApartmentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Apartment deleted successfully' })
  @ApiParam({
    name: 'id',
    description: 'Apartment id',
  })
  remove(@Param('id') id: string) {
    return this.apartmentService.deleteApartment(id);
  }
}
