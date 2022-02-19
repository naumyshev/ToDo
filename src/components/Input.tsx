import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputTypeProps={
    title: string
    setTitle:(title: string)=>void
    onClickAddTaskHandler: () => void
}

export const Input = (props: InputTypeProps) => {

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.onClickAddTaskHandler()
        }
    }

    return (

            <input value={props.title}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressHandler}/>

    );
};