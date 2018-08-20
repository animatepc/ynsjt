export class historyService{
  static save(data){
    window.localStorage.history=JSON.stringify(data)
  }
  static get() {
    return JSON.parse(window.localStorage.history || null);
  }

  static clear() {
    delete window.localStorage.history; 
  }
}
