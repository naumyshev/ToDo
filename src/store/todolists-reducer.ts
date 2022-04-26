import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type  AddTodolistsAT = {
    type: "ADD-TODOLIST"
    title: string
}

type RemoveTodolistsAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string

}

type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

type ActionType = AddTodolistsAT | RemoveTodolistsAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolistID = v1()
            // const newTodolist: TodolistType = {
            //     id: newTodolistID,
            //     title: action.title,
            //     filter: "all"}
            // return [...todolists, newTodolist]
            return [...todolists, { id: newTodolistID, title: action.title, filter: "all"}]
        }
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "CHANGE-TODOLIST-TITLE": {
            return (todolists.map(tl => tl.id === action.id ? {...tl, title: action.title } : tl))
        }
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default: return todolists
    }
}

export const AddTodolistsAC = (title: string): AddTodolistsAT => ({type: 'ADD-TODOLIST', title: title})
export const RemoveTodolistsAC = (id: string): RemoveTodolistsAT => ({type: 'REMOVE-TODOLIST', id: id})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, id})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', filter, id})