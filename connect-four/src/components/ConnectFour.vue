<template>
  <div>
    <h1 class="title"> Connect Four </h1>
     <div class="connect-four-board">
        <div v-for="(n, i) in 7" v-bind:key="i">
          <div v-for="(n, j) in 7" v-bind:key="j">
            <input @click="performMove(i,j)" v-bind:class="{'red':redPlayer}" class="cell"/>
          </div>
        </div>
       </div>
  </div>
</template>]

<script>
export default {
  name: 'ConnectFour',
  props: {
    msg: String
  },
  data() { return {
    activePlayer: '0', //red
    redPlayer: false,
    blackPlayer: false,
    inactivePlayer: '1', //black
    board:  [
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ]
  }}, 
  methods: {
    performMove(x,y){
      //check if valid move

      //Change state
        this.board[x][y] = this.activePlayer;
        if(this.redPlayer){
          this.redPlayer = false;
          this.blackPlayer = true;
        } else {
          this.redPlayer = true;
          this.blackPlayer = false;
        }

        //Switch players
        let temp = this.activePlayer;
        this.activePlayer = this.inactivePlayer;
        this.inactivePlayer = temp;

        //reload board
        this.$forceUpdate();

    },
    checkWin(){
      return 1;
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
   .cell {
        width: 50px;
        height: 50px;
        border: 2px solid rgb(75,75,75);
        font-size: 42px;
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
</style>
