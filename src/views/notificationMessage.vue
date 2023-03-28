<script setup>
import { ref } from 'vue';

    const open=ref(false)

</script>
<template>
    <div class="notify">
        <button @click="open=true">open</button>
        <Teleport to="body"> 
        <div v-if="open" class="modal">
    <div>
        <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
    </div>
  </div>
</Teleport>
    </div>
</template>

<style>
    .notify{
        background-color: aqua;
        position: relative;
    }
 

    .modal{
        position: absolute;
        /* z-index: 999; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.6);
    }
    .modal div{
        background-color: #fff;
        padding: 50px;
        border-radius: 10px;
    }
</style>