import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer ')
    ) {
      return response.status(401).json({ message: 'Token não fornecido.' });
    }

    const token = request.headers.authorization.replace('Bearer ', '');
    const decodeToken: any = jwt.decode(token);
    if (!decodeToken) {
      return response.status(401).json({ message: 'Usuário não autorizado.' });
    }

    const baseUrl = request.baseUrl;
    if (baseUrl.includes('/customer')) {
      request['customerId'] = decodeToken.userId;
      next();
      return;
    }

    const hasPermission = await this.authService.hasPermission(decodeToken, {
      method: request.method,
      baseUrl: baseUrl,
    });

    if (!hasPermission) {
      return response
        .status(401)
        .json({ message: 'Cargo não autorizado a realizar essa ação.' });
    }
    next();
  }
}
