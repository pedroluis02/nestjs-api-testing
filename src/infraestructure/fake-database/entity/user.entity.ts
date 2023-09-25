export class UserEntity {
    id: number
    name: string
    nickname: string 

    constructor (id: number, name: string, nickname: string) {
        this.id = id
        this.name = name
        this.nickname = nickname
    }
}