import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {EditableSpan} from "./components/EditableSpan";
import {Input} from "./components/Input";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodoList: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     let newTitle = title.trim();
    //     if (newTitle !== "") {
    //         props.addTask(newTitle, props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const onClickHandler = (tID: string) => {
        props.removeTask(tID, props.id)
    }

    const onChangeHandlerFromCheckbox = (e: ChangeEvent<HTMLInputElement>, tID: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(tID, newIsDoneValue, props.id);
    }
    
    const callBackForEditableSpan = (tID: string, title: string) => {
        props.updateTask(props.id, tID, title)
    }

    const callBackForEditableSpanForHeader = (title: string) => {
        props.updateTodoList(props.id, title)
    }

    const callBackHandlerForInput = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }
    
    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={(title)=>callBackForEditableSpanForHeader(title)} />
            {/*{props.title}*/}
            <Button name={'x'} callBack={removeTodolist}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
        </h3>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <Input callBack={callBackHandlerForInput}/>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={(e) => onChangeHandlerFromCheckbox(e, t.id)}
                               checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title} callBack={(title)=>callBackForEditableSpan(t.id, title)}/>
                        <Button name={'x'} callBack={() => onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


