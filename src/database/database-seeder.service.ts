import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedDefaultFreelancer();
  }

  private async seedDefaultFreelancer(): Promise<void> {
    const email = process.env.SEED_USER_EMAIL ?? 'freelancer@example.com';
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      this.logger.log(`Seed user already exists: ${email}`);
      return;
    }

    const user = this.usersRepository.create({
      email,
      name: process.env.SEED_USER_NAME ?? 'Demo Freelancer',
      password: process.env.SEED_USER_PASSWORD ?? 'password123',
    });

    await this.usersRepository.save(user);
    this.logger.log(`Seed user created: ${email}`);
  }
}
