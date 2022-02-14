import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const [filter, setFilter] = useState('All')

    const removeTask = (newID: string) => {
        setTasks(tasks.filter((el) => el.id !== newID))
    }

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let filteredTasks = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }

    if (filter === 'completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    const changeFilter = (value: string) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />

        </div>
    );
}

export default App;
