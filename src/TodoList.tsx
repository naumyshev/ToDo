import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete, DeleteOutline} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void

}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistID)
    }

    const onFilterClickHandler = (filter: FilterValuesType) => props.changeFilter(filter, props.todolistID)

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistID)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
            <IconButton
                onClick={() => props.removeTodolist(props.todolistID)}
                size={"small"}>
                <DeleteOutline />
            </IconButton>
            {/*<button onClick={() => props.removeTodolist(props.todolistID)}>X</button>*/}
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistID)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);
                    }
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.todolistID)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            size={'small'}
                            color={'primary'}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />


                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        {/*<span>{t.title}</span>*/}
                        <IconButton
                            onClick={onClickHandler}
                            color={'primary'}
                            size={"small"}>
                            <DeleteOutline/>
                        </IconButton>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <ButtonGroup
            size={'small'}
            variant={'outlined'}
            disableElevation
        >
            <Button
                color={props.filter === 'all' ? "secondary" : "primary"}
                onClick={() => onFilterClickHandler('all')}>All
            </Button>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={() => onFilterClickHandler('all')}>All*/}
            {/*</button>*/}
            <Button
                color={props.filter === 'active' ? "secondary" : "primary"}
                onClick={() => onFilterClickHandler('active')}>Active
            </Button>
            <Button
                color={props.filter === 'completed' ? "secondary" : "primary"}
                onClick={() => onFilterClickHandler('completed')}>Completed
            </Button>
        </ButtonGroup>
    </div>
}

