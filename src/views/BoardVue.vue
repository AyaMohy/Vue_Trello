<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTodoStore } from '../stores/todoStore';

const route=useRoute();
const router=useRouter()
const store=useTodoStore();

  const isTaskOpen=computed( ()=>route.name==='task' )

  function goToTask(task){
    router.push({name:'task', params:{id:task.id}})
  }
  function closeTask(){
    router.push({name:'board'})
  }
  function createTask(e, tasks){
    store.CREATE_TASK({tasks, name:e.target.value})
    e.target.value=''
  }
  function pickupTask(e,taskIndex,columnIndex ){
    e.dataTransfer.effectAllowed ='move';
    e.dataTransfer.dropEffect='move';
    e.dataTransfer.setData('task-index', taskIndex);
    e.dataTransfer.setData('from-column-index', columnIndex)
    e.dataTransfer.setData('type', 'task')
  }
  function pickupColumn(e, columnIndex){
    e.dataTransfer.effectAllowed='move';
    e.dataTransfer.dropEffect='move';
    e.dataTransfer.setData('from-column-index', columnIndex);
    e.dataTransfer.setData('type', 'column')

  }
 

  function moveTaskOrColumn(e, totask, toColumnIndex){
    const type=e.dataTransfer.getData('type');
    if(type==='task'){
      moveTask(e, totask)
    }else{
      moveColumn(e, toColumnIndex)
    }

  }
  function moveTask(e,toTasks){
    const fromColumnIndex=e.dataTransfer.getData('from-column-index');
    const fromTasks=store.board.columns[fromColumnIndex].tasks;
    store.MOVE_TASK({fromTasks,toTasks,  })
  }
  function moveColumn(e, toColumnIndex){
    const fromColumnIndex= e.dataTransfer.getData('from-column-index');
    store.MOVE_COLUMN({fromColumnIndex,toColumnIndex})


  }
  store.$subscribe((mutation,state)=>{
    localStorage.setItem('board', JSON.stringify(state.board))
   
  })
</script>

<template>
  <div class="board" >
 <div class="board-wrapper">
  <div class="card" v-for="(column, $columnIndex) in store.board.columns" :key="column.name"  draggable="true"
  @dragstart.self="pickupColumn($event,$columnIndex)"
  @drop="moveTaskOrColumn($event,column.tasks, $columnIndex)"
  @dragover.prevent
  @dragenter.prevent
  >
    <div class="board-name">{{column.name}}</div>
    <div class="list-reset">
      <div v-for="(task, $taskIndex) in column.tasks" :key="$taskIndex" class="task" @click="goToTask(task)" draggable="true"
       @dragstart="pickupTask($event, $taskIndex, $columnIndex)">
        <span>{{task.name}}</span>
        <p v-if="task.description">{{task.description}}</p>
      </div>
      <input type="text" class="txt_addTask" placeholder="+ Enter new Task" @keyup.enter="createTask($event, column.tasks)">
    </div>
  </div>
  

 </div>
 <teleport to="body">
 <div class="task-modal" v-if="isTaskOpen" @click.self="closeTask">
  <div >
    <router-view></router-view>

  </div>
  </div>
</teleport>
</div>

</template>

<style scoped>
.board-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  
}

.card{
  width: 30%;
  border: 1px solid #ccc;
  background-color: #e9e9e9;
  padding: 8px ;
  border-radius: 4px;
}
.board-name{
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
  
}
.task{
  background-color: rgb(250, 253, 253);
  margin-top: 10px;
  padding: 4px;
  border-radius: 4px;
}
.task span:first-child{
  width: 100%;
  display: inline-block;
  font-weight: 600;
  color: gray;
}
.task p{
  margin-top: 2px;
}
.board{
  position: relative;
}
.task-modal{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;

}
.task-modal div{
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  width: 80%;
  
}
.txt_addTask{
  width: 96%;
  display: block;
  padding: 4px;
  margin-top: 10px;
  border: none;
  background-color: transparent;
  outline: none;

}
@media screen and (max-width:575px) {
  .card{
    width: 100%;
    margin-top: 5px;
  }
}


</style>
