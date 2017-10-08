const socket = io.connect('http://127.0.0.1:4004');

socket.on('connect', function(data) {
  socket.emit('join', 'Hello from client');
});

socket.on('broad', function(data) {
  document.getElementById('text').innerHTML += data;
});

document.getElementById('form').addEventListener('submit', function(e){
  e.preventDefault();
  const message = document.getElementById('input').value;
  socket.emit('messages', message);
});
