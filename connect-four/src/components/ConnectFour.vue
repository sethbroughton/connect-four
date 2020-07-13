<template>
  <div>
    <h1 class="title"> Connect Four </h1>
    <!-- <div v-show="!startGame">
      <button class="button is-primary is-large status" v-model: v-on:click="startGame=true; computer=false">2 Player</button>
      <button class="button is-primary is-large status" v-on:click="startGame=true; computer=true">1 Player</button>
    </div> -->
     <!-- <div v-show="startGame" class="connect-four-board"> -->
       <div class="connect-four-board">
       <div class="status">
       <div v-if="winner==''">
         <div v-if="redTurn">
           <span> Red's Turn </span>
           <span class = "dot red"> </span>
         </div>
         <div v-else>
           <span> Black's Turn </span>
           <span class = "dot black"></span>
          </div>
       </div>
       <div v-else>
         <div v-if="!redTurn">
           <span> Red Wins!!!! </span>
            <span class = "dot red"> </span>
         </div>
         <div v-if="redTurn">
           <span> Black Wins!!! </span>
           <span class = "dot black"></span>
         </div>
       </div>
       </div>
       <div v-for="(n, i) in 7" v-bind:key="i">
         <div v-on:click="performMove(i)" class="column">
          <div v-for="(n, j) in 7" v-bind:key="j" class="row">
            <span class="dot" v-bind:class="getClass(i,j)"/>
          </div>
         </div>
       </div>
        <!-- <button class="button is-dark status" v-on:click="resetBoard(), startGame=false">Return to Menu</button> -->
       <div v-if="winner!=''">
        <button class="button is-primary status" v-on:click="resetBoard()">Play Again</button>
        </div>
       
     </div>
  </div>
</template>

<script>
import io from "socket.io-client"
export default {
  name: 'ConnectFour',
  props: {
    msg: String
  },
  data() { 
    return {
      socket: {},
      board:  [
          ['','','','','','',''],
          ['','','','','','',''],
          ['','','','','','',''],
          ['','','','','','',''],
          ['','','','','','',''],
          ['','','','','','',''],
          ['','','','','','',''],
          ],
        col: 0, 
        redTurn: true,
      winner: '',
      reset: 'End Game',
      startGame: false,
  }}, 
  methods: {
    resetBoard(){
      this.socket.emit("reset")
        this.winner = '';
        this.reset = 'Reset';
        this.redTurn = true;
      this.$forceUpdate();
    },
    performMove(col){
        if(this.winner==''){
        let column = this.board[col];
        let lastPosition = column.lastIndexOf('');
        let player = this.current()
        console.log(lastPosition);
        if(lastPosition!=-1){ //Check if valid move

          //Change state of dot in last position
         let move = {
            'lastPosition': lastPosition,
            'column': col,
            'player': player
          }

          this.socket.emit("move", move)

          //Check winner
          this.socket.on("winner", data => {
            this.winner = data;
          })

          //Switch Players
          this.socket.on("currentPlayer", data => {
            if(data=='1'){
              this.redTurn = true
            } else {
              this.redTurn = false
            }
          })
        }
        }
    },

    getClass(x,y){
      let position = this.board[x][y];
      if(position == '1'){
        return 'red';
      } else if(position == '2') {
        return 'black';
      }
      return 
    },

    
    displayWinner(){
      this.reset = 'Play Again';
    },
    current(){
      if(this.redTurn){
        return '1'
      } else {
        return '2'
      }
    }
  },
  created () {
    this.socket = io("https://fierce-harbor-88891.herokuapp.com");
  },
  mounted () {
    this.socket.on("board", data => {
      this.board = data;
    })
  }
}
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.connect-four-board {
    display: flex;
    width: 800px;
    height: 800px;
    margin-left: 300px
  }

    .dot {
        height: 70px;
        width: 70px;
        background-color: #bbb;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .square {
      height: 30px;
        width: 70px;
        background-color: #bbb;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .status {
      margin: 20px;
    }

    .red{
      background-color: red;

    }
    .black{
      background-color: black
    }
    .blank{
      background-color:white
    }
    .column{
      background-color:grey
    }
    .column:hover{
      background-color: green
    }
    .row{
      background-color: grey
    }
</style>
