export class UserService {
  static save(user){
    localStorage.user = JSON.stringify(user)
  }
  static get(){
    return JSON.parse(localStorage.user || null);
  }
  static clear(){
    delete localStorage.user;
  }
}

