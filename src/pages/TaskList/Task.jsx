/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import classNames from 'classnames';
import EditState from './EditTaskInput';
import createdDataHelper from './TaskListDataHelper';
import { timeToSeconds, formatTime } from './taskTimerHelper';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: timeToSeconds(props.timer),
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
    const {
      name,
      onDeleted,
      onToggleDone,
      onToggleEdit,
      onUpdate,
      done,
      edit,
      createdDate,
      taskId,
    } = this.props;
    const { timeRemaining, timerRunning } = this.state;
    const classNameState = classNames({
      completed: done,
      editing: edit,
      view: !done && !edit,
    });
    return (
      <li className={classNameState}>
        <div className="view">
          <input
            onClick={onToggleDone}
            className="toggle"
            type="checkbox"
            checked={done ? true : false}
            onChange={() => {}}
          />
          <label>
            <span onClick={onToggleDone} className="title">
              {name}
            </span>
            <span className="description">
              {!timerRunning ? (
                <button onClick={this.startTimer} className="icon icon-play" />
              ) : (
                <button onClick={this.stopTimer} className="icon icon-pause" />
              )}
              {formatTime(timeRemaining)}
            </span>
            <span className="description">
              created - {createdDataHelper(createdDate)}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <EditState taskId={taskId} props={this.props} onUpdate={onUpdate} />
      </li>
    );
  }
}
