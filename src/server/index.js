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
  }

  const prefixes = {
    blank: '',
    exp: '::  Express  :: ',
    sock: ':: Socket.io ::'
  };

  if (prefix === 'client') return `${getTime()} ${content}`;

  console.log(colors[color], `${getTime()} ${prefixes[prefix]} ${content}`);
}

app.use(express.static(process.cwd() + '/'));

app.get('/dist', function(req, res, next) {
  log('Request', 'exp', 'cyan');
  res.sendFile(process.cwd() + '/index.html');
});

app.get('/', function(req, res, next) {
  log('Request', 'exp', 'cyan');
  res.sendFile(process.cwd() + '/index.html');
});

io.on('connection', function(client) {
  log('Client connected', 'sock', 'red');

  client.on('join', function(data) {
    log(data, 'sock', 'yellow');
    client.emit('messages', log('Hi from server', 'client'));
  });

  client.on('messages', function(data) {
    log(`Broad :${data}`, 'sock', 'gray');
    client.emit('broad', data);
    client.broadcast.emit('broad',data);
  });
});

server.listen(config.port);

log('Listening on port ' + config.port, 'exp', 'blue');
