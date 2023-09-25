import { User } from "../model/user.model";

export interface IUserRepository {
    getCurrent() : User
}