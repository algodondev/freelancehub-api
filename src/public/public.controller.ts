import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceResponse } from '../services/interfaces/service-response.interface';
import { ServicesService } from '../services/services.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'List available freelance services' })
  @ApiOkResponse({
    description: 'List of available freelance services.',
    schema: {
      type: 'array',
      example: [
        {
          id: 1,
          title: 'Diseño de logo profesional',
          category: 'Diseño',
          description:
            'Diseño de logo con 3 propuestas iniciales y archivos finales.',
          price: 150,
          provider: {
            name: 'Demo Freelancer',
          },
        },
      ],
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          title: {
            type: 'string',
            example: 'Diseño de logo profesional',
          },
          category: { type: 'string', example: 'Diseño' },
          description: {
            type: 'string',
            example:
              'Diseño de logo con 3 propuestas iniciales y archivos finales.',
          },
          price: { type: 'number', example: 150 },
          provider: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Demo Freelancer' },
            },
          },
        },
      },
    },
  })
  findServices(): Promise<ServiceResponse[]> {
    return this.servicesService.findPublicCatalog();
  }
}
