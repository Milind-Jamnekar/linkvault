import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../prisma/generated/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prismaService.user.create({
        data,
      });
      return user;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('A user with this email already exists');
      }
      throw error;
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    try {
      return await this.prismaService.user.update({ where: { id }, data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User #${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User #${id} not found`);
      }
      throw error;
    }
  }
}
