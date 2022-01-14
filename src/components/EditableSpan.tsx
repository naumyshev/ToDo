import React, {ChangeEvent, useState} from 'react';

type propsType = {
    title: string
    callBack:(title: string) => void
}

export const EditableSpan = (props: propsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [edit, setEdit] = useState<boolean>(false)

    const onDoubleClickHandler = () => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input
                value={title}
                onBlur={onBlurHandler}
                autoFocus={true}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};
