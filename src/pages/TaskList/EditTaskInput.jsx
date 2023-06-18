/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

export default class EditState extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyDown(event) {
    const { inputValue } = this.state;
    // eslint-disable-next-line react/prop-types
    const { onUpdate } = this.props;
    console.log(onUpdate);
    const { taskId } = this.props.props;
    if (event.keyCode === 13) {
      const newValue = inputValue;
      onUpdate(newValue, taskId);
      this.setState({ inputValue: '' });
    }
  }

  handleChange(event) {
    if (event.target.value) this.setState({ inputValue: event.target.value });
  }

  render() {
    const { name } = this.props.props;
    return (
      <input
        type="text"
        className="edit"
        defaultValue={name}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
