import {TasksStateType} from "../App";


export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type SecondTasksActionType = {
    type: ''
}

type ActionType = RemoveTasksActionType | SecondTasksActionType

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
            [action.todolistId]: state[action.todolistId]
                .filter(t => t.id !== action.taskId)
            }
        }
        case "": return state

        default: return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return { type: "REMOVE-TASK", taskId, todolistId }
}

export const secondTasksAC = (): SecondTasksActionType => {
    return { type: "" }
}
