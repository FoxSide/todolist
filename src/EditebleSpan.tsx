import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditebleSpanPropsType = {
  title: string
  onChange: (value: string) => void
}
export const EditebleSpan = (props: EditebleSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('')

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return (
    editMode
      ? <TextField onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus  style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}/>
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}