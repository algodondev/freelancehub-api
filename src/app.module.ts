import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { PublicModule } from './public/public.module';
import { Service } from './services/service.entity';
import { ServicesModule } from './services/services.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'freelancehub',
      password: process.env.DB_PASSWORD ?? 'freelancehub',
      database: process.env.DB_NAME ?? 'freelancehub',
      entities: [User, Service],
      synchronize: process.env.TYPEORM_SYNCHRONIZE !== 'false',
    }),
    DatabaseModule,
    UsersModule,
    ServicesModule,
    PublicModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
