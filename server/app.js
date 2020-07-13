const { Socket } = require("dgram");

const Express = require("express")();
const Http = require("http").Server(Express)
const Socketio = require("socket.io")(Http)

var board =  [
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','',''],
    ['','','','','','','']
    ]

Socketio.on("connection", socket => {
    socket.emit("board", board);
    socket.on("move", data => {
        board[data.column][data.lastPosition] = data.player;
        console.log(data.column)
        console.log(data.lastPosition)
        console.log(data.player)
        Socketio.emit("board", board) // update all connected clients

    })
    socket.on("reset", data => {
        board =  [
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','','']
            ]
        Socketio.emit("board", board)
    })
})







Http.listen(3000, () => {
    console.log("Listening on port 3000....")
})