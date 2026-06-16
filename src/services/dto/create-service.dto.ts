import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Diseño de logo profesional' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Diseño' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: 'Diseño de logo con 3 propuestas iniciales y archivos finales.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 150 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;
}
