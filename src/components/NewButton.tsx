import React from 'react';

type NewButtonPropsType = {
  name: string
  callBack: () => void
}

const NewButton = ({name, callBack, ...props}:NewButtonPropsType) => {
  const onClickHandler = () => {
    callBack()
  }
  return (
      <button onClick={onClickHandler}>{name}</button>
  );
};

export default NewButton;