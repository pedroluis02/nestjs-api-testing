export class GreetingDto {
  readonly message: string;

  constructor(message: string) {
    this.message = message;
  }

  static default = (): GreetingDto => new GreetingDto('Hello World!');
}
