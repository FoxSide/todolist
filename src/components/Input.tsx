import React from "react";
import {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
  title: string
  setTitle: (title: string) => void
  addTask: (title: string) => void
}

export const Input = ({title, setTitle, addTask, ...props}: InputPropsType) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (title.trim().length > 0) {
      if (event.key === 'Enter') {
        addTask(title)
        setTitle('')
      }
    }


  }

  return (
    <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
  )
}