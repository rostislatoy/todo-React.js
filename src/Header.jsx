/* eslint-disable react/prop-types */
import React from 'react';
import InputComponent from './InputHeader';

function Header(props) {
  const { todos, onSave } = props;
  return (
    <header className="header">
      <h1>Todos</h1>
      <InputComponent props={todos} onSave={onSave} />
    </header>
  );
}

export default Header;
