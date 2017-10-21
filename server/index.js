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
    sock: ':: Socket.io ::',
    chat: '::   Chat    ::'
  };

  if (prefix === 'client') return `${getTime()} ${content}`;

  console.log(colors[color], `${getTime()} ${prefixes[prefix]} ${content}`);
};

app.use(express.static(process.cwd() + '/'));

app.get('/', (req, res, next) => {
  log('Request', 'exp', 'cyan');
  res.sendFile(process.cwd() + '/index.html');
});

server.lastPlayderID = 1;

io.on('connection', socket => {
    socket.on('newplayer', () => {

        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };

        socket.emit('allplayers', {
            allPlayers: getAllPlayers().players,
            thisPlayerId: socket.player.id
        });

        socket.broadcast.emit('newplayer', {
            hero: socket.player
        });

      socket.on('coordinates', position => {
        socket.player.x = position.x;
        socket.player.y = position.y;
        socket.broadcast.emit('coordinates', {
          position,
          playerID: socket.player.id
        });
      });

        socket.on('messages', message => {
          log(message, 'chat');
          socket.emit('broad', message);
          socket.broadcast.emit('broad', message);
        });

        log(`Connected Player [${socket.player.id}]`, 'sock', 'cyan');
        log(`Players Online   [${getAllPlayers().playersIds}]`, 'sock', 'cyan');


      socket.on('disconnect', () => {
            log(`Disconnected ID  [${socket.player.id}]`, 'sock', 'red');
            log(`Players Online   [${getAllPlayers().playersIds}]`, 'sock', 'red');
            io.emit('remove',socket.player.id);
        });
    });
});

function getAllPlayers() {
    let players = [];
    let playersIds =[];

    Object.keys(io.sockets.connected).forEach( socketID => {
        const player = io.sockets.connected[socketID].player;
        if (player) {
          players.push(player);
          playersIds.push(player.id);
        }
    });

    return {
      players,
      playersIds
    };
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

server.listen(config.port, () => {
  log('Listening on port ' + config.port, 'exp', 'blue');
});

