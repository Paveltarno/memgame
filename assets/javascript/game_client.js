'use strict';

function GameClient(url){
  const socket = io(url);

  this.login = function(name){
    socket.emit('users:login', {
      name: name
    });
  }

  socket
    .on('users:update', (data) => {
      $(this).trigger('usersUpdate');
    });
}

