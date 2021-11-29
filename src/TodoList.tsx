import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    adTask: (taskTitle: string) => void
}

function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>("")
    const addTask = () => {
        props.adTask(title)
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const setAllFilterValue = () => props.changeFilter("all")
    const setActiveFilterValue = () => props.changeFilter("active")
    const setCompletedFilterValue = () => props.changeFilter("completed")

    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;