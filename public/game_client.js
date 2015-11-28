'use strict';

function GameClient(url) {
  var _this = this;

  var socket = io(url);

  this.login = function (name) {
    socket.emit('users:login', {
      name: name
    });
  };

  socket.on('users:update', function (data) {
    $(_this).trigger('usersUpdate');
  });
}