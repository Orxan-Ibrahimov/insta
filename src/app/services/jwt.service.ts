import { Injectable } from '@angular/core';
import { Jwt } from '../models/jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  decodeToken(token: string): Jwt | null {
    try {
      return jwtDecode<Jwt>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);

    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
    return null;
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate < new Date() : true;
  }
}
