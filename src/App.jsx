import React, { Component } from 'react';
import TaskList from './TaskList';
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      emulateTasks: [],
      filter: 'All',
    };
    this.defaultId = 100;
    this.onToggleEdit = this.onToggleEdit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.getFilteredTasks = this.getFilteredTasks.bind(this);
    this.createItem = this.createItem.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  handleFilterChange(filterChanged) {
    this.setState({ filter: filterChanged });
  }

  onToggleDone(id) {
    this.setState(({ emulateTasks }) => {
      const idx = emulateTasks.findIndex((el) => el.id === id);

      const oldItem = emulateTasks[idx];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      };
      const newArray = [
        ...emulateTasks.slice(0, idx),
        newItem,
        ...emulateTasks.slice(idx + 1),
      ];

      return {
        emulateTasks: newArray,
      };
    });
  }

  onToggleEdit(id) {
    this.setState(({ emulateTasks }) => {
      const idx = emulateTasks.findIndex((el) => el.id === id);
      const oldItem = emulateTasks[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      };
      const newArray = [
        ...emulateTasks.slice(0, idx),
        newItem,
        ...emulateTasks.slice(idx + 1),
      ];

      return {
        emulateTasks: newArray,
      };
    });
  }

  getFilteredTasks() {
    const { emulateTasks, filter } = this.state;
    switch (filter) {
      case 'Active':
        return emulateTasks.filter((task) => !task.done);
      case 'Completed':
        return emulateTasks.filter((task) => task.done);
      default:
        return emulateTasks;
    }
  }

  createItem(name) {
    return {
      name,
      done: false,
      createdDate: new Date(),
      edit: false,
      status: 'view',
      // eslint-disable-next-line no-plusplus
      id: this.defaultId++,
    };
  }

  clearCompletedTasks() {
    this.setState(({ emulateTasks }) => {
      const newArray = emulateTasks.filter((el) => !el.done);
      return {
        emulateTasks: newArray,
      };
    });
  }

  deleteItem(id) {
    this.setState(({ emulateTasks }) => {
      const idx = emulateTasks.findIndex((el) => el.id === id);
      const newArr = [
        ...emulateTasks.slice(0, idx),
        ...emulateTasks.slice(idx + 1),
      ];
      return {
        emulateTasks: newArr,
      };
    });
  }

  saveItem(text) {
    this.setState(({ emulateTasks }) => {
      const newTask = this.createItem(text);
      const newArr = [...emulateTasks, newTask];
      return {
        emulateTasks: newArr,
      };
    });
  }

  updateItem(text, id) {
    this.setState(({ emulateTasks }) => {
      const idx = emulateTasks.findIndex((el) => el.id === id);
      const oldItem = emulateTasks[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
        name: text,
      };
      const newArray = [
        ...emulateTasks.slice(0, idx),
        newItem,
        ...emulateTasks.slice(idx + 1),
      ];

      return {
        emulateTasks: newArray,
      };
    });
  }

  render() {
    const { emulateTasks, filter } = this.state;
    const getDoneTasks = emulateTasks.filter((el) => !el.done).length;

    return (
      <section className="todoapp">
        <Header todos={emulateTasks} onSave={this.saveItem} />
        <section className="main">
          <TaskList
            todos={this.getFilteredTasks()}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            onUpdate={this.updateItem}
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
