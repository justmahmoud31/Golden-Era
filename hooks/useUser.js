import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function useUser() {
  const token = Cookies.get('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    return isExpired ? null : decoded;
  } catch {
    return null;
  }
}
