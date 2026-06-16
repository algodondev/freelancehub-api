import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './service.entity';
import { ServiceResponse } from './interfaces/service-response.interface';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
    providerId: number,
  ): Promise<ServiceResponse> {
    const provider = await this.usersService.findById(providerId);

    if (!provider) {
      throw new NotFoundException('Provider user not found');
    }

    const service = this.servicesRepository.create({
      ...createServiceDto,
      provider,
    });
    const savedService = await this.servicesRepository.save(service);

    return this.toResponse(savedService);
  }

  findAll(): Promise<Service[]> {
    return this.servicesRepository.find({
      relations: { provider: true },
      order: { id: 'ASC' },
    });
  }

  async findPublicCatalog(): Promise<ServiceResponse[]> {
    const services = await this.findAll();

    return services.map((service) => this.toResponse(service));
  }

  private toResponse(service: Service): ServiceResponse {
    return {
      id: service.id,
      title: service.title,
      category: service.category,
      description: service.description,
      price: Number(service.price),
      provider: {
        name: service.provider.name,
      },
    };
  }
}
