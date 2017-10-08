const guestUrl = window.location.href;
const socket = io.connect(guestUrl);

socket.on('connect', function(data) {
  socket.emit('join', 'Hello from client : ' + guestUrl);
});

socket.on('broad', function(data) {
  document.getElementById('text').innerHTML += data;
});

document.getElementById('form').addEventListener('submit', function(e){
  e.preventDefault();
  const message = document.getElementById('input').value;
  socket.emit('messages', message);
});
