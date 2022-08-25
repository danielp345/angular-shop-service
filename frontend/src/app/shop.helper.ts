export class ShopHelper {
  static isUser() {
    const userLogin = localStorage.getItem('userLogin');
    if (userLogin) {
      return userLogin;
    } else {
      return false;
    }
  }

  static isAdmin() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
