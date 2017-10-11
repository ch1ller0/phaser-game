const
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  config = {
    port: 4004
  };

const log = (content, prefix = 'blank', color = 'white') => {
  const getTime = () => new Date().toLocaleTimeString();

  const colors = {
    gray: "\x1b[0m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m"
  };

  const prefixes = {
    blank: '',
    exp: '::  Express  :: ',
    sock: ':: Socket.io ::'
  };

  if (prefix === 'client') return `${getTime()} ${content}`;

  console.log(colors[color], `${getTime()} ${prefixes[prefix]} ${content}`);
};

app.use(express.static(process.cwd() + '/'));

app.get('/', function(req, res, next) {
  log('Request', 'exp', 'cyan');
  res.sendFile(process.cwd() + '/index.html');
});

server.lastPlayderID = 0;

io.on('connection', socket => {
    socket.on('newplayer', () => {
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };
        socket.emit('allplayers', {
            allPlayers: getAllPlayers(),
            thisPlayerId: socket.player.id
        });
        socket.broadcast.emit('newplayer', {
            hero: socket.player
        });

        log(`New Player ${socket.player.id}`, 'exp', 'cyan');

        socket.on('disconnect',function(){
            log(`Disconnected Player ${socket.player.id}`, 'exp', 'red');
            io.emit('remove',socket.player.id);
        });
    });
});

function getAllPlayers() {
    let players = [];
    Object.keys(io.sockets.connected).forEach( socketID => {
        const player = io.sockets.connected[socketID].player;
        if (player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// io.on('connection', function(client) {
//   log('Client connected', 'sock', 'red');
//
//   client.on('join', function(data) {
//     log(data, 'sock', 'yellow');
//     client.emit('messages', log('Hi from server', 'client'));
//   });
//
//   client.on('messages', function(data) {
//     log(`Broad :${data}`, 'sock', 'gray');
//     client.emit('broad', data);
//     client.broadcast.emit('broad',data);
//   });
// });

server.listen(config.port, function () {
  log('Listening on port ' + config.port, 'exp', 'blue');
});

