import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }

    const onClickChangeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const onClickRemoveTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onKeyPress={onKeyPressHandler} onChange={onChangeInputHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => onClickRemoveTaskHandler(el.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => onClickChangeFilterHandler('all')}>All</button>
                <button onClick={() => onClickChangeFilterHandler('active')}>Active</button>
                <button onClick={() => onClickChangeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};

