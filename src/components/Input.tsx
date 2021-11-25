import React from "react";
import {ChangeEvent, KeyboardEvent} from "react";

type InputPropsType = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: InputPropsType) => {
  return (
    <input value={props.value} onChange={props.onChange} onKeyPress={props.onKeyPress}/>
  )
}