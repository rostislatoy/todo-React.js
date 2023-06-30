import React from 'react';
import classNames from 'classnames';
import EditState from './EditTaskInput';
import createdDataHelper from './TaskListDataHelper';
import { timeToSeconds, formatTime } from './taskTimerHelper';


export default function Task (props) {
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
    timerTrack,
    timer,
    startTimer,
    stopTimer,
  } = props
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
            {!timerTrack ? (
              <button
                onClick={() => startTimer(taskId, timerTrack)}
                className="icon icon-play"
              />
            ) : (
              <button
                onClick={() => stopTimer(taskId, timer)}
                className="icon icon-pause"
              />
            )}
            {formatTime(timeToSeconds(timer))}
          </span>
          <span className="description">
            created - {createdDataHelper(createdDate)}
          </span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEdit} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <EditState taskId={taskId} props={props} onUpdate={onUpdate} />
    </li>
  );
}