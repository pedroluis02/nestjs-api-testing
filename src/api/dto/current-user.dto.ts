export class CurrentUserDto {
  id: number;
  name: string;
  fullName: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.fullName = name;
  }
}
