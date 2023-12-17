import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export const UserLoginAuth = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userLogin = request.user;
    if (userLogin) {
      return userLogin;
    }

    throw new BadRequestException();
  },
);
