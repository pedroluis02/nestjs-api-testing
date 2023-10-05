import { Injectable } from "@nestjs/common";
import { UserEntity } from "./../entity/user.entity";

//@Injectable()
export class UserDao {
    getCurrent() : UserEntity {
        return new UserEntity(1, "Example", "example-user");
    }
}