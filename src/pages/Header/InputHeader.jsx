/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */

import React, { Component } from 'react';

class InputComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      minValue: '',
      secValue: '',
      hasTask: true,
      hasMin: true,
      hasSec: true,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDownMin = this.handleKeyDownMin.bind(this);
    this.handleChangeMin = this.handleChangeMin.bind(this);
    this.handleKeyDownSec = this.handleKeyDownSec.bind(this);
    this.handleChangeSec = this.handleChangeSec.bind(this);
    this.noTaskName = this.noTaskName.bind(this);
  }
  noTaskName(boolean) {
    if (boolean) {
      this.setState({ hasTask: true });
    } else {
      this.setState({ hasTask: false });
    }
  }
  noTaskMin(boolean) {
    if (boolean) {
      this.setState({ hasMin: true });
    } else {
      this.setState({ hasMin: false });
    }
  }
  noTaskSec(boolean) {
    if (boolean) {
      this.setState({ hasSec: true });
    } else {
      this.setState({ hasSec: false });
    }
  }
  handleKeyDown(event) {
    const { onSave } = this.props;
    const { inputValue, minValue, secValue } = this.state;
    if (event.keyCode === 13 && inputValue.trim() === '') {
      this.noTaskName(false);
      this.noTaskMin(false);
      this.noTaskSec(false);
    }
    if (event.keyCode === 13 && inputValue.trim() !== '') {
      this.noTaskName(true);
      this.noTaskMin(true);
      this.noTaskSec(true);

      if ((parseInt(minValue) && parseInt(secValue)) !== isNaN) {
        onSave(inputValue, `${minValue}:${secValue}`);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      } else {
        onSave(inputValue, 0);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      }
    }
  }

  handleKeyDownMin(event) {
    const { onSave } = this.props;
    const { inputValue, minValue, secValue } = this.state;
    if (event.keyCode === 13) {
      if (inputValue.trim() === '') {
        this.noTaskName(false);
      }
      if (secValue.trim() === '') {
        this.noTaskSec(false);
      }
      if (minValue.trim() === '') {
        this.noTaskMin(false);
      }

      if (inputValue.trim() !== '') {
        this.noTaskName(true);
        if (minValue.trim() !== '' && secValue.trim() !== '') {
          this.noTaskMin(true);
          this.noTaskSec(true);

          if ((parseInt(minValue) && parseInt(secValue)) !== isNaN) {
            onSave(inputValue, `${minValue}:${secValue}`);
            this.setState({ inputValue: '', secValue: '', minValue: '' });
          } else {
            onSave(inputValue, 0);
            this.setState({ inputValue: '', secValue: '', minValue: '' });
          }
        }
      }
    }
  }
  handleKeyDownSec(event) {
    const { onSave } = this.props;
    const { inputValue, minValue, secValue } = this.state;
    if (event.keyCode === 13) {
      if (inputValue.trim() === '') {
        this.noTaskName(false);
      }
      if (secValue.trim() === '') {
        this.noTaskSec(false);
      }
      if (minValue.trim() === '') {
        this.noTaskMin(false);
      }

      if (inputValue.trim() !== '') {
        this.noTaskName(true);
        if (minValue.trim() !== '' && secValue.trim() !== '') {
          this.noTaskMin(true);
          this.noTaskSec(true);

          if ((parseInt(minValue) && parseInt(secValue)) !== isNaN) {
            onSave(inputValue, `${minValue}:${secValue}`);
            this.setState({ inputValue: '', secValue: '', minValue: '' });
          } else {
            onSave(inputValue, 0);
            this.setState({ inputValue: '', secValue: '', minValue: '' });
          }
        }
      }
    }
  }

  handleChange(event) {
    const value = event.target.value;
    if (value) this.setState({ inputValue: value });
  }

  handleChangeMin(event) {
    const value = event.target.value;
    if (value && value <= 59) {
      this.setState({ minValue: value });
    } else {
      this.setState({ minValue: 59 });
    }
    if (value) this.setState({ minValue: value });
  }

  handleChangeSec(event) {
    const value = event.target.value;
    if (value && value <= 59) {
      this.setState({ secValue: value });
    } else {
      this.setState({ secValue: 59 });
    }
    if (value) this.setState({ secValue: value });
  }

  render() {
    const { inputValue, secValue, minValue, hasTask, hasMin, hasSec } =
      this.state;

    return (
      <form className="new-todo-form">
        <input
          type="text"
          className={hasTask ? 'new-todo' : 'new-todo incorrect'}
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
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
          onChange={this.handleChangeMin}
          onKeyDown={this.handleKeyDownMin}
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
          onChange={this.handleChangeSec}
          onKeyDown={this.handleKeyDownSec}
          placeholder="Sec"
        />
      </form>
    );
  }
}

export default InputComponent;
