import React, { useState, useEffect, useMemo } from 'react';
import List from '../List/List';
import Context from '../../context';
import './app.scss';

function App() {
  const [userInput, setUserInput] = useState('');

  const [todos, setTodos] = useState([]);

  // Получить данные из localstorage
  useEffect(() => {
    const todosStor = JSON.parse(localStorage.getItem('userTodos'));
    if (todosStor) {
      setTodos(todosStor);
    }
  }, []);

  // Записать данные в localstorage
  useEffect(() => {
    if (todos.length) {
      localStorage.setItem('userTodos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  const handleClick = () => {
    if (userInput !== '') {
      setTodos([...todos, userInput]);
      setUserInput('');
    }
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((todo) => todos.indexOf(todo) !== index));
  };

  const contextMemo = useMemo(() => ({ removeTodo }), [todos]);
  return (
    <Context.Provider value={contextMemo}>
      <div className="wrapper">
        <div className="content">
          <div className="container">
            <div className="main-title">To-Do List</div>

            <div className="top-menu">
              <input
                className="main-input"
                onChange={handleInputChange}
                value={userInput}
                placeholder="Enter your to-do"
              />
              <button className="main-btn" type="submit" onClick={handleClick}>Add To-Do</button>
            </div>

            <div className="bottom-menu">
              {todos.length ? <List list={todos} /> : <div className="empty">No todos!</div>}
            </div>

          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
