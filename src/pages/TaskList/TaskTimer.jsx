/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable lines-between-class-members */
import React from 'react';
import { timeToSeconds, formatTime } from './taskTimerHelper';

class TaskTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: timeToSeconds(props.time),
      timerRunning: false,
      shouldStopTimer: false,
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
  componentDidUpdate(prevProps) {
    if (
      prevProps.filter !== this.props.filter &&
      this.state.timerRunning &&
      !this.state.shouldStopTimer
    ) {
      console.log('changed');
      this.setState({ shouldStopTimer: true });
    } else if (this.state.shouldStopTimer) {
      this.stopTimer();
      this.setState({ shouldStopTimer: false });
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
