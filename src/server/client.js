const Client = {};

Client.guestUrl = window.location.href;
Client.socket = io.connect(Client.guestUrl);

Client.askNewPlayer = () => {
    Client.socket.emit('newplayer');
};

Client.socket.on('newplayer',function(data){
    const Game = game.state.callbackContext
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    console.log(data);
    const Game = game.state.callbackContext;
    for(let i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});

Client.socket.on('remove',function(id){
    const Game = game.state.callbackContext;
    Game.removePlayer(id);
});

export default Client;
