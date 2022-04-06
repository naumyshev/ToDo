import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [title, setTitle] = useState(props.title)

    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }

    return (
        editMode
            ? <input
                value={title}
                autoFocus //={true}
                onBlur={offEditMode}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}/>
            : <span
                onDoubleClick={onEditMode}>
                {props.title}
            </span>
    );
};