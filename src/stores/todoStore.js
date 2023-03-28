import { defineStore } from "pinia";
import defaultBoard from "../default-board";
import { uuid } from "../utils";


// const board = JSON.parse(localStorage.getItem('board')) ||defaultBoard;
export const useTodoStore = defineStore('todoStore', {
    state: () => {
        return {
            board:defaultBoard,
            count: 2
        }
    },
    getters: {
        doubleCount(state) {
            return state.board
        },
        getUserById: (state) => {
            return (userId) => state.count + userId
        },
        getTask(state) {

            return (id) => {
                for (let column = 0; column < state.board.columns.length; column++) {
                    for (let task = 0; task < state.board.columns[column].tasks.length; task++) {
                        if (state.board.columns[column].tasks[task].id == id) {
                            // console.log('task',state.board.columns[column].tasks[task])
                            return (state.board.columns[column].tasks[task])
                        }
                    }



                }
            }
        }
    },
    actions:{
        CREATE_TASK({tasks, name}){
            // console.log(tasks)
            tasks.push({
                name,
                id:uuid(),
                description:''
            });
            console.log(tasks)

        },
        UPDATE_TASK({task, key, value}){
            task[key]=value

        },
        MOVE_TASK({fromTasks,toTasks,taskIndex}){
            const taskToMove=fromTasks.splice(taskIndex, 1)[0]
            toTasks.push(taskToMove)

        },
        MOVE_COLUMN({fromColumnIndex,toColumnIndex}){
            const columnList=this.board.columns;
            const columnToMove=columnList.splice(fromColumnIndex, 1)[0]
            columnList.splice(toColumnIndex,0,columnToMove)

        },
        
    }

})