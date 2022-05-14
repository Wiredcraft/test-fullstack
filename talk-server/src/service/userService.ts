import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { IUserService, UserEntity } from './interface';

@Injectable()
export class UserService implements IUserService {
    constructor(private readonly userEntityService: InMemoryDBService<UserEntity>) {}

    async create(params: UserEntity): Promise<UserEntity> {
        return this.userEntityService.create(params);
    }
}
