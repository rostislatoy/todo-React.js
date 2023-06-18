/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';

function timeToSeconds(timeString) {
  if (
    !timeString.includes(':') ||
    timeString.startsWith(':') ||
    timeString.endsWith(':')
  ) {
    return 0;
  }

  const [minutes, seconds] = timeString.split(':');

  if (isNaN(parseInt(minutes)) || isNaN(parseInt(seconds))) {
    return 0;
  }

  return parseInt(minutes) * 60 + parseInt(seconds);
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return `Time's up`;
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

class TaskTimer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      timeRemaining: timeToSeconds(props.time),
      timerRunning: false,
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.timerRunning) {
        this.setState((prevState) => ({
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startTimer() {
    this.setState({ timerRunning: true });
  }

  stopTimer() {
    this.setState({ timerRunning: false });
    this.props.timerUpdate(
      formatTime(this.state.timeRemaining),
      this.props.taskId
    );
  }

  render() {
    return (
      <span className="description">
        <button onClick={this.startTimer} className="icon icon-play" />
        <button onClick={this.stopTimer} className="icon icon-pause" />
        {formatTime(this.state.timeRemaining)}
      </span>
    );
  }
}

export default TaskTimer;
