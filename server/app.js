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
    console.log(`Client connected [id=${socket.id}]`);
    socket.emit("board", board);
    socket.on("move", data => {
        board[data.column][data.lastPosition] = data.player;
        console.log(data.column)
        console.log(data.lastPosition)
        console.log(data.player)
        Socketio.emit("board", board) // update all connected clients
        let winner = checkWin();
        if(winner==true){
            Socketio.emit("winner", data.player)
        }
        let currentPlayer = data.player
        if(currentPlayer=='1'){
            currentPlayer = '2'
        } else {
            currentPlayer = '1'
        }
        Socketio.emit("currentPlayer", currentPlayer)
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

let checkWin = function () {
       // check vertical
        let counter = 0;
        let arr = board;
        for(let i = 0; i<arr.length; i++){
          let start = arr[i][0];
          counter = 1;
          for(let j = 1; j<arr.length; j++){
            let position = arr[i][j];
            if(position == start && start!=''){
              counter++;
              if(counter==4){
                console.log(`Player: ${position}`)
                return true
              }
            } else {
              start = position;
              counter = 1;
            }
          }
        }
  
        //check horizontal
        counter = 0;
        for(let i = 0; i<arr.length; i++){
          let start = arr[0][i];
          counter = 1;
          for(let j = 1; j<arr.length; j++){
            let position = arr[j][i];
            if(position == start && start!=''){
              counter++;
              if(counter==4){
                return true;
              }
            } else {
              start = position;
              counter = 1;
            }
          }
        }
  
        //Diagonal - left to right
         for(let i = 3; i<arr.length; i++){
           for(let j = 0; j<arr.length-3; j++){
             let position = arr[i][j];
             if(position != ''){
             if(position==arr[i-1][j+1] && position==arr[i-2][j+2] && position==arr[i-3][j+3]){
               return true
             }
             }
           }
         }
  
        //Diagonal - right to left
          for(let i = 3; i<arr.length; i++){
           for(let j = 3; j<arr.length; j++){
             let position = arr[j][i];
             if(position != ''){
             if(position==arr[j-1][i-1] && position==arr[j-2][i-2] && position==arr[j-3][i-3]){
               return true
             }
             }
           }
         }
         return false
      }






Http.listen(3000, () => {
    console.log("Listening on port 3000....")
})