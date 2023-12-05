import { Controller, Get } from '@nestjs/common';
import { GreetingDto } from './../dto/greeting.dto';

@Controller('greeting')
export class GreetingController {
  @Get()
  async get(): Promise<GreetingDto> {
    return GreetingDto.default();
  }
}
