import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


export function checkUser() {
  const jwtcookie = Cookies.get('jwt');
  if (typeof jwtcookie == 'undefined') {
    return "";
  }
  const decodedToken = jwt_decode(jwtcookie) ? jwt_decode(jwtcookie) : "";
  const userId = JSON.stringify(decodedToken.userId)
  return userId;
}
