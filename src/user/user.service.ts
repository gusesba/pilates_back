import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Primeiro cria o usuário
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        passwordHash: createUserDto.passwordHash,
        userType: createUserDto.userType,
      }
    });

    // Depois cria a pessoa e já a vincula ao usuário
    await this.prisma.person.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        ownerId: user.id,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });

    // Retorna o usuário com a pessoa incluída
    return this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        person: true
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
