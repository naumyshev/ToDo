import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}

function App() {
    //BLL:

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: "What to learn", filter: 'all'},
        {id: todolistID_2, title: "What to buy", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: true},
            {id: v1(), title: "Oil", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Beer", isDone: false}
        ]
    })

    // tasks:
    function removeTask(taskID: string, todolistID: string) {

        const filteredTasks = tasks[todolistID].filter(t => t.id != taskID);
        setTasks({...tasks, [todolistID]: filteredTasks})
    }

    function addTask(title: string, todolistID: string) {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistID: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID]
                .map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }

    function changeTaskTitle(taskId: string, title: string, todolistID: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID]
                .map(t => t.id === taskId ? {...t, title} : t)
        })
    }

    // todolists:
    function changeTodolistFilter(filter: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        const copyTasks = {...tasks}
        delete tasks[todolistID]
        setTasks(copyTasks)
    }

    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {
            id: newTodolistID,
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function changeTodolistTitle(title: string, todolistID: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }

    // UI:
    const todolistComponents = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Todolist
                key={tl.id}
                todolistID={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistComponents}
        </div>
    );
}

export default App;
