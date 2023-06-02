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
import React, { Component } from 'react';
import classNames from 'classnames';
import EditState from './EditTaskInput';
import createdDataHelper from './TaskListDataHelper';

export default class Task extends Component {
  constructor() {
    super();
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
    } = this.props;

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
          <label onClick={onToggleDone}>
            <span className="description">{name}</span>
            <span className="created">
              created - {createdDataHelper(createdDate)}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <EditState props={this.props} onUpdate={onUpdate} />
      </li>
    );
  }
}
