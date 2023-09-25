import { User } from "src/domain/model/user.model";
import { UserEntity } from "../entity/user.entity";
import { Injectable } from "@nestjs/common";

//@Injectable()
export class UserEntityMapper {
    toDomain = (entity: UserEntity): User => new User(entity.id, entity.name)
}