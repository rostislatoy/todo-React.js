/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-else-return */
import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import filterState from '../constants/filter';

function TaskList({
  todos,
  onDeleted,
  onToggleDone,
  onToggleEdit,
  onUpdate,
  filter,
}) {
  const elements = todos.map((el) => {
    const { id, ...elProps } = el;
    return (
      <Task
        key={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...elProps}
        todos={todos}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        onUpdate={onUpdate}
        taskId={id}
      />
    );
  });
  if (elements.length) {
    // console.log(elements);
    return <ul className="todo-list">{elements}</ul>;
  } else {
    switch (filter) {
      case filterState.Active:
        return <p className="no-todos">You have completed all the tasks</p>;
      case filterState.Completed:
        return (
          <p className="no-todos">There are no completed todos here yet</p>
        );
      default:
        return <p className="no-todos">There's no todos yet :(</p>;
    }
  }
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onUpdate: () => {},
  filter: '',
};

TaskList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onUpdate: PropTypes.func,
  filter: PropTypes.string,
};

export default TaskList;
