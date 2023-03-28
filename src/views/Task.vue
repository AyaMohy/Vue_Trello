<script>
  import { useTodoStore } from '../stores/todoStore';
  export default{
    setup(){
      const store=useTodoStore()
      return{
        store
      }
    },
    data(){
      return{

      }
    },
    computed:{
      task(){
        return this.store.getTask((this.$route.params.id).toString())
      }
    },
    methods:{
      updateTaskProperty(event, key){
        this.store.UPDATE_TASK({task:this.task,key,value:event.target.value})
      }
    }
  }
</script>
<template>
  <div class="task">
    <input type="text" :value="task.name" class="task-name" @change="updateTaskProperty($event, 'name')" @keyup.enter="updateTaskProperty($event, 'name')">
    <textarea  :value="task.description" class="task-desc"  rows="10" @change="updateTaskProperty($event,'description' )"></textarea>
  </div>
</template>

<style scoped>
  .task-desc{
    border: none;
    outline: none;
    resize: none;
    width: 100%;
  }
  .task-name{
    border: none;
    outline: none;

  }
  .task{
    /* width: 80%; */
  }
@media (min-width: 1024px) {
  
}
</style>
