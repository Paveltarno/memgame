'use strict';

class GameClient{
  constructor(url){
    this.socket = io(url);
  }

  login(name){
    console.log(this.name);
    this.socket.emit('login', {
      name: name
    });
  }
}
