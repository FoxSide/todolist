import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditebleSpan} from "../EditebleSpan";

export default {
  title: 'TODOLIST/EditebleSpan',
  component: EditebleSpan,
  args: {
    title: 'JS',
    onChange: action('EditableSpan changed')
  },
} as ComponentMeta<typeof EditebleSpan>;

const Template: ComponentStory<typeof EditebleSpan> = (args) => <EditebleSpan {...args} />;

export const EditebleSpanStory = Template.bind({});
EditebleSpanStory.args = {}
