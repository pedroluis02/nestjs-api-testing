import { Module } from "@nestjs/common";
import { ServiceModule } from "src/service/service.module";
import { CurrentUserController } from "./controller/currentUser.Controller";
import { UserDtoMapper } from "./mapper/userDto.mapper";

@Module({
    imports: [ServiceModule],
    controllers: [CurrentUserController],
    providers: [UserDtoMapper]
})

export class ApiModule {}