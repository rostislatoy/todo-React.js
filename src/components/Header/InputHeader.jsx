import React, { useState } from 'react';

export default function InputComponent(props) {
  const [inputValue, setInputValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const [secValue, setSecValue] = useState('');
  const [hasTask, setTask] = useState(true);
  const [hasMin, setMin] = useState(true);
  const [hasSec, setSec] = useState(true);

  const { onSave } = props;

  function noTaskName(boolean) {
    if (boolean) {
      setTask(true);
    } else {
      setTask(false);
    }
  }
  function noTaskMin(boolean) {
    if (boolean) {
      setMin(true);
    } else {
      setMin(false);
    }
  }
  function noTaskSec(boolean) {
    if (boolean) {
      setSec(true);
    } else {
      setSec(false);
    }
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13 && inputValue.trim() === '') {
      noTaskName(false);
      noTaskMin(false);
      noTaskSec(false);
    }
    if (event.keyCode === 13 && inputValue.trim() !== '') {
      noTaskName(true);
      noTaskMin(true);
      noTaskSec(true);

      if ((parseInt(minValue) && parseInt(secValue)) !== isNaN) {
        onSave(inputValue, `${minValue}:${secValue}`);
        setInputValue('');
        setMinValue('');
        setSecValue('');
      } else {
        onSave(inputValue, 0);
        setInputValue('');
        setMinValue('');
        setSecValue('');
      }
    }
  }

  function handleKeyDownTimer(event) {
    if (event.keyCode === 13) {
      if (inputValue.trim() === '') {
        noTaskName(false);
      }
      if (secValue.trim() === '') {
        noTaskSec(false);
      }
      if (minValue.trim() === '') {
        noTaskMin(false);
      }

      if (inputValue.trim() !== '') {
        noTaskName(true);
        if (minValue.trim() !== '' && secValue.trim() !== '') {
          noTaskMin(true);
          noTaskSec(true);

          if ((parseInt(minValue) && parseInt(secValue)) !== isNaN) {
            onSave(inputValue, `${minValue}:${secValue}`);
            setInputValue('');
            setMinValue('');
            setSecValue('');
          } else {
            onSave(inputValue, 0);
            setInputValue('');
            setMinValue('');
            setSecValue('');
          }
        }
      }
    }
  }

  function handleChange(event) {
    const value = event.target.value;
    if (value) setInputValue(value);
  }
  function handleChangeMin(event) {
    const value = event.target.value;
    if (value && value <= 59) {
      setMinValue(value);
    } else {
      setMinValue(59);
    }
    if (value) setMinValue(value);
  }

  function handleChangeSec(event) {
    const value = event.target.value;
    if (value && value <= 59) {
      setSecValue(value);
    } else {
      setSecValue(59);
    }
    if (value) setSecValue(value);
  }
  return (
    <form className="new-todo-form">
      <input
        type="text"
        className={hasTask ? 'new-todo' : 'new-todo incorrect'}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Task"
        autoFocus
      />
      <input
        type="number"
        value={minValue}
        min={0}
        max={59}
        className={
          hasMin ? 'new-todo-form__timer' : 'new-todo-form__timer incorrect'
        }
        onChange={handleChangeMin}
        onKeyDown={handleKeyDownTimer}
        placeholder="Min"
      />
      <input
        type="number"
        value={secValue}
        min={0}
        max={59}
        className={
          hasSec ? 'new-todo-form__timer' : 'new-todo-form__timer incorrect'
        }
        onChange={handleChangeSec}
        onKeyDown={handleKeyDownTimer}
        placeholder="Sec"
      />
    </form>
  );
}
