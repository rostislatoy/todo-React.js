/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class InputComponent extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyDown(event) {
    const { onSave } = this.props;
    const { inputValue } = this.state;
    if (event.keyCode === 13 && inputValue.trim() !== '') {
      // eslint-disable-next-line react/destructuring-assignment
      onSave(inputValue);
      this.setState({ inputValue: '' });
    }
  }

  handleChange(event) {
    if (event.target.value) this.setState({ inputValue: event.target.value });
  }

  render() {
    const { inputValue } = this.state;
    return (
      <input
        type="text"
        className="new-todo"
        value={inputValue}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        placeholder="What needs to be done?"
      />
    );
  }
}

export default InputComponent;
