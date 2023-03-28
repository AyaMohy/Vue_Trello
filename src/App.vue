<script setup>
import {useTodoStore} from './stores/todoStore'

import {  RouterView } from 'vue-router';

const store=useTodoStore();

store.$subscribe((mutation,state)=>{
    localStorage.setItem('board', JSON.stringify(state.board))
   
  })
</script>

<template>
 
  

  <RouterView />
</template>

<style scoped>




nav a.router-link-exact-active:hover {
  background-color: transparent;
}



</style>
