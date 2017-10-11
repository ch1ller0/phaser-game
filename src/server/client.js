const Client = {};

Client.guestUrl = window.location.href;
Client.socket = io.connect(Client.guestUrl);

Client.askNewPlayer = () => {
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer',function(data) {
    const {
        hero
    } = data;
    const Game = game.state.callbackContext;
    Game.addNewPlayer(hero.id, hero.x, hero.y);
});

Client.socket.on('allplayers',function(payload){
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

Client.socket.on('remove',function(id){
    const Game = game.state.callbackContext;
    Game.removePlayer(id);
});

export default Client;
