import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

function TaskList({ todos, onDeleted, onToggleDone, onToggleEdit, onUpdate }) {
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

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  onUpdate: () => {},
};

TaskList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default TaskList;
