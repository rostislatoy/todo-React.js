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
// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNow } from 'date-fns';
import EditState from './EditTaskInput';

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
    const createdAgo = formatDistanceToNow(new Date(createdDate), {
      addSuffix: true,
      includeSeconds: true,
    });
    const timelnSeconds = Math.round(
      (new Date() - new Date(createdDate)) / 1000
    );
    const showSeconds = timelnSeconds < 60;

    return (
      <li className={done ? 'completed' : edit ? 'editing' : 'view'}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={!!done}
            onChange={() => {}}
          />
          <label onClick={onToggleDone}>
            <span className="description">{name}</span>
            <span className="created">
              created
              <br />
              {showSeconds ? `${timelnSeconds} seconds ago` : createdAgo}
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
