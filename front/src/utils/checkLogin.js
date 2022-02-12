import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


export function checkLogin() {
  const jwtcookie = Cookies.get('jwt');
  if (typeof jwtcookie == 'undefined') {
    return false;
  }
  const decodedToken = jwt_decode(jwtcookie) ? jwt_decode(jwtcookie) : "";
  const userId = JSON.stringify(decodedToken.userId)
  if (userId) {
    return true
  } else {
    return false
  }
}



// Passer plutôt un élément "auth" dans le token??