import jwt_decode from 'jwt-decode';

export function decodeToken(token) {
  try {
    return jwt_decode(token);
  } catch (error) {
    return null;
  }
}
