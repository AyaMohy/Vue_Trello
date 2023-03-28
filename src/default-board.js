import { uuid } from "./utils";

export default {
    name:"workshop",
    columns:[
        {
            name:'todo',
            tasks:[
                {
                    description:'',
                    name:'first task',
                    id:uuid(),
                    userAssigned:null
                },
                {
                    description:'the bag is in the room',
                    name:'second task',
                    id:uuid(),
                    userAssigned:null
                },
                {
                    description:'',
                    name:'third task',
                    id:uuid(),
                    userAssigned:null
                }
            ]
        },
        {
            name:'in-progress',
            tasks:[
                {
                    description:'the bag is in the room',
                    name:'first task',
                    id:uuid(),
                    userAssigned:null
                },
                {
                    description:'',
                    name:'say hi to adam on the coach ',
                    id:uuid(),
                    userAssigned:null
                },
                {
                    description:'',
                    name:'third task',
                    id:uuid(),
                    userAssigned:null
                }
            ]

        },
        {
            name:'done',
            tasks:[
                {
                    description:'',
                    name:'first task',
                    id:uuid(),
                    userAssigned:null
                },
                {
                    description:'',
                    name:'second task',
                    id:uuid(),
                    userAssigned:null
                },
                {
                    description:'',
                    name:'pack my stauff',
                    id:uuid(),
                    userAssigned:null
                }
            ]

        }
    ]
}