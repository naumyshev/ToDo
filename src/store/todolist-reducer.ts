import {FilterValuesType, TodolistType} from "../App";

type  AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}

type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string

}

type ChangeTodolistFilterAT = {
    type: "CHANGE_TODOLIST_FILTER"
    filter: FilterValuesType
    id: string
}

type ActionType = AddTodolistAT | RemoveTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return todolists // заглушка
        case "REMOVE-TODOLIST":
            return todolists // заглушка
        case "CHANGE-TODOLIST-TITLE":
            return todolists // заглушка
        case "CHANGE_TODOLIST_FILTER":
            return todolists // заглушка
        default: return todolists
    }
}