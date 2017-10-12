const Client = {};

Client.guestUrl = window.location.href;
Client.socket = io.connect(Client.guestUrl);

Client.askNewPlayer = () => {
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer', data => {
    const {
        hero
    } = data;
    const Game = game.state.callbackContext;
    Game.addNewPlayer(hero.id, hero.x, hero.y);
});

Client.socket.on('allplayers', payload => {
    const {
        allPlayers,
        thisPlayerId
    } = payload;
    console.log(`Your ID is ${thisPlayerId}`);
    const Game = game.state.callbackContext;
    for(let i = 0; i < allPlayers.length; i++){
        Game.addNewPlayer(allPlayers[i].id,allPlayers[i].x,allPlayers[i].y, thisPlayerId);
    }
});

Client.socket.on('remove', id => {
    const Game = game.state.callbackContext;
    Game.removePlayer(id);
});

Client.socket.on('broad', message => {
  document.getElementById('text').innerHTML += `<p>${message}</p>`;
});

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const message = document.getElementById('input').value;
  document.getElementById('input').value = '';
  Client.socket.emit('messages', message);
});

export default Client;
