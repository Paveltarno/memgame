'use strict';

class GameClient{
  constructor(url){
    this.socket = io(url);
  }
}

const client = new GameClient("localhost:3000");
