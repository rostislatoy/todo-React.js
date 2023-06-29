/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { timeToSeconds, formatTime } from './taskTimerHelper';

class TaskTimer extends React.Component {
  constructor(props) {
    super(props);
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
  componentDidUpdate() {
    if (this.state.timeRemaining <= 0 && this.state.timerRunning) {
      this.setState({ timerRunning: false });
    }
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
    const { timeRemaining, timerRunning } = this.state;
    return (
      <span className="description">
        {!timerRunning ? (
          <button onClick={this.startTimer} className="icon icon-play" />
        ) : (
          <button onClick={this.stopTimer} className="icon icon-pause" />
        )}
        {formatTime(timeRemaining)}
      </span>
    );
  }
}

export default TaskTimer;
