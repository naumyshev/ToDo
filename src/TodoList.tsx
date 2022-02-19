import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {FullInput} from "./components/FullInput";
import {Input} from "./components/Input";


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

    // const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter') {
    //         onClickAddTaskHandler()
    //     }
    // }

    const onClickChangeFilterHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const onClickRemoveTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    // const callbackForFullInput = (title: string) => {
    //     props.addTask(title)
    // }

    return (
        <div>
            <h3>{props.title}</h3>
            <Input title={title} setTitle={setTitle} onClickAddTaskHandler={onClickAddTaskHandler}/>
            <Button name={'+'} callBack={onClickAddTaskHandler}/>
            {/*<FullInput callback={callbackForFullInput} />*/}
            {/*<div>*/}
            {/*    <input value={title} onKeyPress={onKeyPressHandler} onChange={onChangeInputHandler}/>*/}
            {/*    /!*<button onClick={onClickAddTaskHandler}>+</button>*!/*/}
            {/*    <Button name={'+'} callBack={onClickAddTaskHandler} />*/}
            {/*</div>*/}
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            {/*<button onClick={() => onClickRemoveTaskHandler(el.id)}>x</button>*/}
                            <Button name={'x'} callBack={() => onClickRemoveTaskHandler(el.id)} />
                        </li>
                    )
                })}
            </ul>
            <div>
                {/*<button onClick={() => onClickChangeFilterHandler('all')}>All</button>*/}
                <Button name={'All'} callBack={() => onClickChangeFilterHandler('all')} />
                {/*<button onClick={() => onClickChangeFilterHandler('active')}>'Active'</button>*/}
                <Button name={'Active'} callBack={() => onClickChangeFilterHandler('active')} />
                {/*<button onClick={() => onClickChangeFilterHandler('completed')}>Completed</button>*/}
                <Button name={'Completed'} callBack={() => onClickChangeFilterHandler('completed')} />
            </div>
        </div>
    );
};

