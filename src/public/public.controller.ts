import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceResponse } from '../services/interfaces/service-response.interface';
import { ServicesService } from '../services/services.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'List available freelance services' })
  findServices(): Promise<ServiceResponse[]> {
    return this.servicesService.findPublicCatalog();
  }
}
