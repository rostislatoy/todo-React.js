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
import React, { Component } from 'react';


class InputComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      minValue: '',
      secValue: '',
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDownMin = this.handleKeyDownMin.bind(this);
    this.handleChangeMin = this.handleChangeMin.bind(this);
    this.handleKeyDownSec = this.handleKeyDownSec.bind(this);
    this.handleChangeSec = this.handleChangeSec.bind(this);
  }

  handleKeyDown(event) {
    const { onSave } = this.props;
    const { inputValue, minValue, secValue } = this.state;
    if (event.keyCode === 13 && inputValue.trim() !== '') {
      if((parseInt(minValue) &&  parseInt(secValue)) !== isNaN){
        onSave(inputValue, `${minValue}:${secValue}`);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      }else{
        onSave(inputValue, 0);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      }
    }
  }

  handleKeyDownMin(event) {
    const { onSave } = this.props;
    const { inputValue, minValue, secValue } = this.state;
    if (event.keyCode === 13 && inputValue.trim() !== '') {
      if((parseInt(minValue) &&  parseInt(secValue)) !== isNaN){
        onSave(inputValue, `${minValue}:${secValue}`);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      }else{
        onSave(inputValue, 0);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      }
    }
  }

  handleKeyDownSec(event) {
    const { onSave } = this.props;
    const { inputValue, minValue, secValue } = this.state;
    if (event.keyCode === 13 && inputValue.trim() !== '') {
      if((parseInt(minValue) &&  parseInt(secValue)) !== isNaN){
        onSave(inputValue, `${minValue}:${secValue}`);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      }else{
        onSave(inputValue, 0);
        this.setState({ inputValue: '', secValue: '', minValue: '' });
      }
    }
  }

  handleChange(event) {
    if (event.target.value) this.setState({ inputValue: event.target.value });
  }

  handleChangeMin(event) {
    if (event.target.value) this.setState({ minValue: event.target.value });
  }

  handleChangeSec(event) {
    if (event.target.value) this.setState({ secValue: event.target.value });
  }

  render() {
    const { inputValue, secValue, minValue } = this.state;

    return (
      <form className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Task"
          autoFocus
        />
        <input
          value={minValue}
          className="new-todo-form__timer"
          onChange={this.handleChangeMin}
          onKeyDown={this.handleKeyDownMin}
          placeholder="Min"
        />
        <input
          value={secValue}
          className="new-todo-form__timer"
          onChange={this.handleChangeSec}
          onKeyDown={this.handleKeyDownSec}
          placeholder="Sec"
        />
      </form>
    );
  }
}


export default InputComponent;
