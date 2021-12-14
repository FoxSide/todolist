import React, {ChangeEvent, useState} from "react";

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
      ? <input onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus/>
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}