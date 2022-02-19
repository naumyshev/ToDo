import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type FullInputPropsType = {
    callback:(title: string)=>void
}

export const FullInput = (props: FullInputPropsType) => {

    let [title, setTitle] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.callback(title)
        setTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }

    return (
        <div>
            <input value={title}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeInputHandler}/>
            {/*<button onClick={onClickAddTaskHandler}>+</button>*/}
            <Button name={'+'} callBack={onClickAddTaskHandler} />
        </div>
    );
};