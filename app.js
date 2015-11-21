'use strict';

// Consts
const DEFAULT_PORT = 3000;

let program = require ('commander');
let app = require ('http').createServer(handler);
let fs = require ('fs');
let io = require ('socket.io')(app);

program
  .version('1.0.0')
  .option('-p, --port <n>', 'Set port', parseInt)
  .parse(process.argv);

let port = program.port || DEFAULT_PORT;
app.listen(port);
console.log(`Server started on port ${port}`);

// HTTP server for static files
function handler(req, res) {
    var url = req.url && req.url !== '/' ? req.url : '/index.html';
    if (url.indexOf('..') !== -1) {
        res.writeHead(403);
        return res.end('Error accessing resource');
    } else {
        if (url.indexOf('/node_modules/') !== 0) {
            url = '/public' + url;
        }
        fs.readFile(__dirname + url,
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading resource');
                }
                if (/\.(css)$/.test(url)){
                  res.setHeader("Content-Type", "text/css");
                }
                res.writeHead(200);
                res.end(data);
            });
    }
}

class Player{
  constructor(id, name){
    this.id;
    this.name;
  }
}

// Game manager
var playerManager = (function(){
  let sockets = new Map();
  let players = new Map();

  return {
    addPlayer: function(socket, player){
      // Create a server player which holds both player and socket
      sockets.set(socket.id, socket);
      players.set(socket.id, player);
      debugger;
    },

    removePlayer: function(socket){
      sockets.delete(socket.id);
      players.delete(socket.id)
    },

    getSocket: function(id){
      return sockets.get(id);
    },

    getPlayer: function(id){
      return players.get(id);
    },

    listPlayers: function(){
      return Array.from(players.values);
    }
  };
}());

io.on('connection', function(socket){
  console.log('new connection from socket ' + socket.id);

  socket.on('login', function(username){
    let player = new Player(socket.id, username);
    playerManager.addPlayer(socket, player);
    console.log(username + ' has logged in');

    // Send update message to everyone
    io.emit('update players', playerManager.listPlayers());
    console.log('there are now ' + playerManager.listPlayers().length + ' players')
    });

  socket.on('disconnect', function(){
    playerManager.removePlayer(socket);
    console.log('disconnected socket ' + socket.id);
    console.log('there are now ' + playerManager.listPlayers().length + ' players')
  });
});
