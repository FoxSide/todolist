import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
  const errorMessage = <div style={{color: "red"}}>Title is required!</div>
  return (
    <div style={{
      display:' flex',
      justifyContent:'center'
    }}>
      <TextField
        value={title}
        onChange={changeTitle}
        onKeyPress={onKeyPressAddTask}
        variant={'outlined'}
        label={'Title'}
        size={'small'}
        error={error}
        helperText={error && errorMessage}
      />
      <IconButton onClick={addTask} size={'small'} color={'primary'}>
        <AddBox/>
      </IconButton>
    </div>
  )
}