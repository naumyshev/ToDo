import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all"|"active"|"completed"

function App() {


    //BLL:
    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    
    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    let tasksForRender = tasks

    if(filter === "active") {
        tasksForRender = tasksForRender.filter(t => t.isDone === false)
    }

    if(filter === "completed") {
        tasksForRender = tasksForRender.filter(t => t.isDone === true)
    }

    //UI:
    return (
        <div className="App">

            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
