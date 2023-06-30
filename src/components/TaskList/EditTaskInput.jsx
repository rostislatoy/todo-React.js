/* eslint-disable arrow-body-style */
import React, { useState } from 'react';

export default function EditState({ props }) {
  const [inputValue, setInputValue] = useState('');

  function handleKeyDown(event) {
    const { onUpdate, taskId, timer, onToggleEdit } = props;
    if (event.keyCode === 13) {
      const newValue = inputValue;
      onUpdate(newValue, taskId, timer);
      setInputValue('');
    }
    if (event.key === 'Escape') {
      const id = taskId;
      onToggleEdit(id);
    }
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <input
      type="text"
      className="edit"
      defaultValue={props.name}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}
