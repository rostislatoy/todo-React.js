/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import TaskList from '../pages/TaskList/TaskList';
import Header from '../pages/Header/Header';
import Footer from '../pages/Footer/Footer';
import filterState from '../constants/filter';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: filterState.All,
      timers: [],
    };
    this.defaultId = 700;
    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
    this.createItem = this.createItem.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.updateTaskTime = this.updateTaskTime.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  componentDidMount() {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    const storageFilter = localStorage.getItem('filter');
    if (storageTodos && storageFilter) {
      this.setState({ todos: storageTodos });
      this.setState({ filter: storageFilter });
    }
  }

  componentDidUpdate() {
    const { todos, filter } = this.state;
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('filter', filter);
  }

  handleFilterChange(newFilterValue) {
    this.setState({ filter: newFilterValue });
  }

  onToggleDone(id) {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);

      const oldItem = todos[idx];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      };
      const newArray = [
        ...todos.slice(0, idx),
        newItem,
        ...todos.slice(idx + 1),
      ];

      return {
        todos: newArray,
      };
    });
  }

  onToggleEdit(id) {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const oldItem = todos[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      };
      const newArray = [
        ...todos.slice(0, idx),
        newItem,
        ...todos.slice(idx + 1),
      ];

      return {
        todos: newArray,
      };
    });
  }

  updateTaskTime(remainingTime, taskId, timeTrack = false) {
    this.setState((prevState) => ({
      todos: prevState.todos.map((task) => {
        if (task.id === taskId) {
          return { ...task, timer: remainingTime, timeTrack };
        }
        return task;
      }),
    }));
  }

  getFilteredTasks() {
    const { todos, filter } = this.state;
    switch (filter) {
      case filterState.Active:
        return todos.filter((task) => !task.done);
      case filterState.Completed:
        return todos.filter((task) => task.done);
      default:
        return todos;
    }
  }

  createItem(name, timer = ':') {
    return {
      name,
      done: false,
      createdDate: new Date(),
      edit: false,
      status: 'view',
      timer,
      timerTrack: false,
      id: this.defaultId++,
    };
  }

  clearCompletedTasks() {
    this.setState(({ todos }) => {
      const newArray = todos.filter((el) => !el.done);
      return {
        todos: newArray,
      };
    });
  }

  deleteItem(id) {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const newArr = todos.filter((el, index) => index !== idx);
      return {
        todos: newArr,
      };
    });
  }

  saveItem(text, timer = ':') {
    this.setState(({ todos }) => {
      const newTask = this.createItem(text, timer);
      const newArr = [...todos, newTask];
      return {
        todos: newArr,
      };
    });
  }

  updateItem(text, id, timer = ':') {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const oldItem = todos[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
        name: text,
        timer,
      };
      const newArray = [
        ...todos.slice(0, idx),
        newItem,
        ...todos.slice(idx + 1),
      ];

      return {
        todos: newArray,
      };
    });
  }
  render() {
    const { todos, filter } = this.state;

    const getDoneTasks = todos.filter((el) => !el.done).length;

    return (
      <section className="todoapp">
        <Header
          todos={todos}
          onSave={this.saveItem}
          onUpdate={this.updateItem}
        />
        <section className="main">
          <TaskList
            todos={this.getFilteredTasks()}
            onDeleted={this.deleteItem}
            onUpdate={this.updateItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            timerUpdate={this.updateTaskTime}
            filter={filter}
          />
        </section>
        <Footer
          onFilterChange={this.handleFilterChange}
          doneTasks={getDoneTasks}
          clearCompleted={this.clearCompletedTasks}
          filter={filter}
        />
      </section>
    );
  }
}
