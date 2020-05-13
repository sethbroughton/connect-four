<template>
  <div>
    <h1 class="title"> Connect Four </h1>
    
     <div class="connect-four-board container">
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
       <div v-for="(n, i) in 7" v-bind:key="i">
         <div v-on:click="performMove(i)">
          <div v-for="(n, j) in 7" v-bind:key="j">
            <span class="dot" v-bind:class="getClass(i,j)"/>
          </div>
         </div>
       </div>
        <button class="button is-light" v-on:click="resetBoard">{{reset}}</button>
     </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectFour',
  props: {
    msg: String
  },
  data() { return {
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
      reset: 'Reset',
      computer: true,
  }}, 
  methods: {
    opponentPlay(){
      let input = this.stringifyBoard(this.board)
      console.log(input)
      fetch(`http://kevinalbs.com/connect4/back-end/index.php/getMoves?board_data=${input}`)
      .then((response) => {
        return response.json();
      })
      .then((values) => {
        let max = 0;
        let col = "0";
        for(let i = 0; i<7; i++){
            if(values[i]>max){
            col = i;
        }
        }
        let column = this.board[col];
        let lastPosition = column.lastIndexOf('');
        if(this.redTurn){
            this.board[col][lastPosition] = 1;
          } else {
            this.board[col][lastPosition] = 2;  
          }
          //Check winner
          this.checkWin();

          //Switch Players
          this.redTurn = !this.redTurn;

          this.$forceUpdate();
      })
    },
    stringifyBoard(arr){
      let board = "";
      for(let i = 0; i<arr.length; i++){
        for(let j = 6; j>=0; j--){
          let position = arr[j][i];
          if(position == ''){
            position = '0';
          }
          board = board + position;
        }
      }
      console.log(board);
      return board;

    },
    resetBoard(){
      this.board = [
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ];
        this.winner = '';
        this.reset = 'Reset';
        this.redTurn = true;
      this.$forceUpdate();
    },
    performMove(col){
        if(this.winner==''){
        let column = this.board[col];
        let lastPosition = column.lastIndexOf('');
        if(lastPosition!=-1){ //Check if valid move

          //Change state of dot in last position
          if(this.redTurn){
            this.board[col][lastPosition] = 1;
          } else {
            this.board[col][lastPosition] = 2;  
          }
          console.log(`i=${lastPosition} j=${col}`)
          //Check winner
          this.checkWin();

          //Switch Players
          this.redTurn = !this.redTurn;
        }
      
        //reload board
          this.$forceUpdate();
        }
          if (this.computer && !this.redTurn){
          this.opponentPlay();
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

    checkWin(){
      //check vertical
      let counter = 0;
      let arr = this.board;
      for(let i = 0; i<arr.length; i++){
        let start = arr[i][0];
        counter = 1;
        for(let j = 1; j<arr.length; j++){
          let position = arr[i][j];
          if(position == start && start!=''){
            counter++;
            if(counter==4){
              console.log(`Player: ${position}`)
              this.winner = position
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
              this.winner = position;
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
             this.winner = position;
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
             this.winner = position;
           }
           }
         }
       }

       if(this.winner!=''){
         this.displayWinner();
       }

    },
    displayWinner(){
      this.reset = 'Play Again';
    }
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
    flex-wrap: wrap;
    width: 800px;
    height: 800px;
  }

    .dot {
        height: 50px;
        width: 50px;
        background-color: #bbb;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .red{
      background-color: red;

    }
    .black{
      background-color: black
    }
    .blank{
      background-color: #bbb
    }
</style>
