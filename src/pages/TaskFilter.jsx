/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import filterState from '../constants/filter';

function TaskFilter(props) {
  const filterStage = props.filter;
  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => props.handleChange(filterState.All)}
          className={filterStage === filterState.All ? 'selected' : ''}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => props.handleChange(filterState.Active)}
          className={filterStage === filterState.Active ? 'selected' : ''}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => props.handleChange(filterState.Completed)}
          className={filterStage === filterState.Completed ? 'selected' : ''}
        >
          Completed{' '}
        </button>
      </li>
    </ul>
  );
}

TaskFilter.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  handleChange: () => {},
  filter: filterState.All,
};

TaskFilter.propTypes = {
  handleChange: PropTypes.func,
  filter: PropTypes.string,
};

export default TaskFilter;
