<template>
  <div>
    <h1 class="title"> Connect Four </h1>
     <div class="connect-four-board container">
       <div v-on:click="performMove(0)">
       <span class="dot" v-bind:class="getClass(0,0)"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot" v-bind:class="getClass(0,6)"/>
       </div>
       <div v-on:click="performMove(1)">
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       <span class="dot"/>
       </div>
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
        ['1','1','1','1','1','1','2'],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ],
      col: 0
  }}, 
  methods: {
    performMove(col){
      //check if valid move

      //Change state
      let column = this.board[col];
      let position = column.lastIndexOf('');
      if(position!=-1){
        console.log(position);




      }


      //Switch players


      //reload board
        this.$forceUpdate();

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
