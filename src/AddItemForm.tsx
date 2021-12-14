import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const addTask = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addItem(trimmedTitle)
    } else {
      setError(true)
    }
    setTitle("")
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  }
  const errorClass = error ? "error" : "";
  const errorMessage = <div style={{color: "red"}}>Title is required!</div>
  return (
    <div>
      <input
        value={title}
        onChange={changeTitle}
        onKeyPress={onKeyPressAddTask}
        className={errorClass}
      />
      <button onClick={addTask}>+</button>
      {error && errorMessage}
    </div>
  )
}