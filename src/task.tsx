import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./AppWithRedux";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditebleSpan} from "./EditebleSpan";
import {HighlightOff} from "@material-ui/icons";

type TaskPropsType = {
  task: TaskType
  removeTask: (taskId: string, todolistId: string) => void
  todolistId: string
  changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
}


export const Task = React.memo(({task, removeTask, todolistId, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {
  const getClasses = () => task.isDone ? "is-done" : "";
  const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    changeTaskStatus(task.id, newIsDoneValue, todolistId)
  }, [changeTaskStatus, task.id, todolistId])
  const onChangeHandlerRemoveTask = useCallback(() => removeTask(task.id, todolistId), [removeTask, task.id, todolistId])

  const changeStatusHandler = useCallback((newValue: string) => {
    changeTaskTitle(task.id, newValue, todolistId)
  }, [changeTaskTitle, task.id, todolistId])
  return (
    <div>
      <ListItem
        key={task.id}
        className={getClasses()}
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Checkbox checked={task.isDone} onChange={changeStatus} color={'primary'} size={'small'}/>
        <EditebleSpan title={task.title} onChange={changeStatusHandler}/>
        <IconButton onClick={onChangeHandlerRemoveTask} size={'small'}>
          <HighlightOff/>
        </IconButton>
      </ListItem>
    </div>
  );
})