/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

function TaskFilter(props) {
  const filterStage = props.filter;
  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => props.handleChange('All')}
          className={filterStage === 'All' ? 'selected' : ''}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => props.handleChange('Active')}
          className={filterStage === 'Active' ? 'selected' : ''}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => props.handleChange('Completed')}
          className={filterStage === 'Completed' ? 'selected' : ''}
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
  filter: 'All',
};

TaskFilter.propTypes = {
  handleChange: PropTypes.func,
  filter: PropTypes.string,
};

export default TaskFilter;
