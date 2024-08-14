import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Apartment } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

import {
  ApartmentShortDto,
  CreateApartmentDto,
  UpdateApartmentDto,
} from './dtos';

@Injectable()
export class ApartmentService {
  private readonly logger = new Logger(ApartmentService.name);

  constructor(private readonly prismaService: DatabaseService) {}

  async createApartment(data: CreateApartmentDto): Promise<Apartment> {
    const created = await this.prismaService.apartment.create({
      data,
    });

    this.logger.log({
      message: `Apartment with id: ${created.id} inserted successfully`,
    });

    return created;
  }

  async findAll(
    page: number = 1,
    size: number = 10,
  ): Promise<ApartmentShortDto[]> {
    return this.prismaService.apartment.findMany({
      skip: (page - 1) * size,
      take: +size,
      select: {
        id: true,
        title: true,
        sqft: true,
        bdrooms: true,
        bthrooms: true,
        price: true,
        status: true,
      },
    });
  }

  async findApartmentById(id: string): Promise<Apartment | null> {
    return this.prismaService.apartment.findUnique({
      where: { id },
    });
  }

  async updateApartment(
    id: string,
    data: UpdateApartmentDto,
  ): Promise<Apartment> {
    const existingApartment = await this.findApartmentById(id);
    if (!existingApartment) {
      const exception = new NotFoundException(
        `Apartment with id: ${id} id does not exist`,
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

    const updated = await this.prismaService.apartment.update({
      where: {
        id,
      },
      data,
    });

    this.logger.log({
      message: `Apartment with id: ${id} updated successfully`,
    });

    return updated;
  }

  async deleteApartment(id: string): Promise<Apartment> {
    const deleted = await this.prismaService.apartment.delete({
      where: {
        id,
      },
    });

    this.logger.log({
      message: `Apartment with id: ${id} deleted successfully`,
    });

    return deleted;
  }
}
