import { Controller, Get, Inject } from "@nestjs/common";
import { IUserService } from "src/domain/service/user.interface";
import { CurrentUserDto } from "../dto/currentUser.dto";
import { UserDtoMapper } from "../mapper/userDto.mapper";

@Controller('current-user')
export class CurrentUserController {
    constructor(
        @Inject('USER_SERVICE')
        private readonly service: IUserService,
        private readonly mapper: UserDtoMapper,
    ) {}

    @Get()
    async get(): Promise<CurrentUserDto> {
        const model = this.service.getCurrent()
        return this.mapper.fromDomain(model)
    }
}