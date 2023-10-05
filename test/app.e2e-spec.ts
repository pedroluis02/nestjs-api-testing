import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { GreetingDto } from './../src/api/dto/greeting.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
  });

  it('/greeting (GET)', () => {
    return request(app.getHttpServer())
      .get('/greeting')
      .expect(200)
      .expect(`{"message":"${GreetingDto.default().message}"}`)
  });
});
