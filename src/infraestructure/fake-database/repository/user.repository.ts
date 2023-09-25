import { Inject } from "@nestjs/common";
import { User } from "src/domain/model/user.model";
import { IUserRepository } from "src/domain/repository/user.interface";
import { UserDao } from "../dao/user.dao";
import { UserEntityMapper } from "../mapper/user.mapper";

export class UserRepository implements IUserRepository {
    constructor(
        private readonly dao: UserDao = new UserDao(),
        private readonly mapper: UserEntityMapper = new UserEntityMapper(),
    ) {}

    getCurrent(): User {
        const entity = this.dao.getCurrent()
        return this.mapper.toDomain(entity)
    }
}