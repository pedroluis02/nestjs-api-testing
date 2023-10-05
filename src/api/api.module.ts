import { Module } from "@nestjs/common";
import { ServiceModule } from "src/service/service.module";
import { CurrentUserController } from "./controller/currentUser.Controller";
import { UserDtoMapper } from "./mapper/userDto.mapper";
import { GreetingController } from "./controller/greeting.controller"; 

@Module({
    imports: [ServiceModule],
    controllers: [GreetingController, CurrentUserController],
    providers: [UserDtoMapper]
})

export class ApiModule {}