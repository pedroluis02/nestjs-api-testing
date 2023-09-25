import { Inject } from "@nestjs/common";
import { User } from "src/domain/model/user.model";
import { IUserRepository } from "src/domain/repository/user.interface";
import { IUserService } from "src/domain/service/user.interface";

export class UserService implements IUserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly repository: IUserRepository,
    ) {}

    getCurrent = (): User => this.repository.getCurrent()
}