import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceResponse } from './interfaces/service-response.interface';
import { ServicesService } from './services.service';

interface AuthenticatedRequest {
  user: AuthenticatedUser;
}

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Publish a service as the authenticated freelancer',
  })
  create(
    @Body() createServiceDto: CreateServiceDto,
    @Request() request: AuthenticatedRequest,
  ): Promise<ServiceResponse> {
    return this.servicesService.create(createServiceDto, request.user.userId);
  }
}
