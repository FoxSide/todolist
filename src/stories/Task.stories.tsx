import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../task";
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLIST/Task',
  component: Task,
  args: {
    removeTask: action('task deleted'),
    changeTaskStatus: action('change status'),
    changeTaskTitle: action('change task title'),
    todolistId: '12'
  },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  task: {id: 'q', title: 'JS', isDone: true}
}

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  task: {id: 'q', title: 'JS', isDone: false}
}
