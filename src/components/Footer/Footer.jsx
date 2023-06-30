import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from './TaskFilter';

function Footer(props) {
  const { doneTasks, onFilterChange, filter, clearCompleted } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{doneTasks} items left</span>
      <TaskFilter handleChange={onFilterChange} filter={filter} />
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  doneTasks: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
