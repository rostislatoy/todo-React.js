/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

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
    const { taskId, name } = this.props.props;
    if (event.keyCode === 13) {
      onUpdate(inputValue, taskId);
      this.setState({ inputValue: name });
    }
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
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
// EditState.propTypes = {
//   name: PropTypes.string.isReq,
//   onUpdate: PropTypes.func.isRequired,
// };
