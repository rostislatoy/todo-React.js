

import React, { Component } from 'react';

export default class EditState extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
    this.inputRef = React.createRef();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleKeyDown(event) {
    const { inputValue } = this.state;
    const { onUpdate } = this.props;
    const { taskId } = this.props.props;
    if (event.keyCode === 13) {
      const newValue = inputValue;
      onUpdate(newValue, taskId, this.props.props.timer);
      this.setState({ inputValue: '' });
    }
    if (event.key === 'Escape') {
      const id = this.props.taskId;
      const onToggleEdit = this.props.props.onToggleEdit;
      onToggleEdit(id);
    }
    if (this.inputRef.current && !this.inputRef.current.contains(event.target) && this.props.props.edit) {
      this.props.props.onToggleEdit(this.props.props.taskId);
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
        ref={this.inputRef}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
