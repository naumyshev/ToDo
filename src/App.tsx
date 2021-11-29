import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    console.log(v1())

    //BLL:
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: false},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    const addTask = (newTaskTitle: string) => {

        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        //const copyState = [...tasks]
        //copyState.push(newTask)
        setTasks([newTask, ...tasks])
    }

    let tasksForRender = tasks

    if (filter === "active") {
        tasksForRender = tasksForRender.filter(t => !t.isDone)
    }

    if (filter === "completed") {
        tasksForRender = tasksForRender.filter(t => t.isDone)
    }

    //UI:
    return (
        <div className="App">

            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                adTask={addTask}
            />

        </div>
    );
}

export default App;
