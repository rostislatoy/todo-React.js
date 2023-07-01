import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList/TaskList';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import filterState from '../constants/filter';
import generateRandomId from './generateId';
import {
  timeToSeconds,
  formatTime,
} from '../components/TaskList/taskTimerHelper';


export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(filterState.All);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));
    const storageFilter = localStorage.getItem('filter');
    if (storageTodos && storageFilter) {
      setTodos(storageTodos);
      setFilter(storageFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const timerProgressive = (id) => {
    setTodos((prevTodosTimer) => {
      const idx = prevTodosTimer.findIndex((el) => el.id === id);
      const updatedTodos = [...prevTodosTimer];
      updatedTodos[idx].timer = timeToSeconds(updatedTodos[idx].timer) - 1;
      updatedTodos[idx].timer = formatTime(updatedTodos[idx].timer);
      return updatedTodos;
    });
  };

  const onToggleDone = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
      return updatedTodos;
    });
  };

  const onTimerTrack = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, timerTrack: !todo.timerTrack };
        }
        return todo;
      });
      return updatedTodos;
    });
  };

  const onToggleEdit = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, edit: !todo.edit };
        }
        return todo;
      });
      return updatedTodos;
    });
  };

  const updateTaskTime = (remainingTime, taskId, timeTrack = false) => {
    const updatedTodos = todos.map((task) => {
      if (task.id === taskId) {
        return { ...task, timer: remainingTime, timeTrack };
      }
      return task;
    });
    setTodos(updatedTodos);
  };

  const startTimer = (taskId) => {
    if (intervalId === null) {
      onTimerTrack(taskId);
      const id = setInterval(() => {
        timerProgressive(taskId);
      }, 1000);
      setIntervalId(id);
    }
  };

  const stopTimer = (taskId, timer = ':') => {
    onTimerTrack(taskId);
    updateTaskTime(timer, taskId);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleFilterChange = (newFilterValue) => {
    setFilter(newFilterValue);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case filterState.Active:
        return todos.filter((task) => !task.done);
      case filterState.Completed:
        return todos.filter((task) => task.done);
      default:
        return todos;
    }
  };

  function createItem(name, timer = ':') {
    return {
      name,
      done: false,
      createdDate: new Date(),
      edit: false,
      status: 'view',
      timer,
      timerTrack: false,
      id: generateRandomId(),
    };
  }

  const clearCompletedTasks = () => {
    todos.forEach(el => {
      if(el.timeTrack){
        stopTimer(el.id);
      }
    })
    setTodos((prevTodos) => prevTodos.filter((task) => !task.done));
  };

  const deleteItem = (id) => {
    stopTimer(id);
    setTodos((prevTodos) => prevTodos.filter((task) => task.id !== id));
  };

  const saveItem = (text, timer = ':') => {
    setTodos((prevTodos) => {
      const newTask = createItem(text, timer);
      const newArr = [...prevTodos, newTask];
      return newArr;
    });
  };

  const updateItem = (name, id, newTimer = ':') => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      const idx = updatedTodos.findIndex((el) => el.id === id);
      updatedTodos[idx] = {
        ...updatedTodos[idx],
        timer: newTimer,
        name,
      };

      return updatedTodos;
    });
  };

  const getDoneTasks = todos.filter((el) => !el.done).length;

  return (
    <React.StrictMode>
      <section className="todoapp">
        <Header todos={todos} onSave={saveItem} onUpdate={updateItem} />
        <section className="main">
          <TaskList
            startTimer={startTimer}
            stopTimer={stopTimer}
            onTimerTrack={onTimerTrack}
            timerProgressive={timerProgressive}
            todos={getFilteredTasks()}
            onDeleted={deleteItem}
            onUpdate={updateItem}
            onToggleDone={onToggleDone}
            onToggleEdit={onToggleEdit}
            timerUpdate={updateTaskTime}
            filter={filter}
          />
        </section>
        <Footer
          onFilterChange={handleFilterChange}
          doneTasks={getDoneTasks}
          clearCompleted={clearCompletedTasks}
          filter={filter}
        />
      </section>
    </React.StrictMode>
  );
}
