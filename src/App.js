import React, { useState, useEffect } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);

  const obtenerInfoServer = async () => {
 
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Anderson');
      const data = await response.json();
      setList(data);

  };

  useEffect(() => {
    obtenerInfoServer();
  }, []);

  return (
    <>
      <div className='todolist-container'>
        <h1>Todos</h1>
        <ul>
          <li>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const newTodo = { label: inputValue, done: false };
                  const newList = [ newTodo, ...list];
                  fetch('https://playground.4geeks.com/apis/fake/todos/user/Anderson', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newList),
                    
                  })
                  .then(() => {
                    setList(newList);
                    setInputValue('');
                    console.log(newList)
                  })
                  
                  
                }
              }}
              placeholder='What do you need to do?'
            />
          
          </li>
          {list.map((task, index) => (
            <li key={index}>
              {task.label}{' '}
              <button onClick={() => {
                  const updatedList = list.filter((_, currentIndex) => index !== currentIndex);
                  fetch('https://playground.4geeks.com/apis/fake/todos/user/Anderson', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedList),
                  });
                  obtenerInfoServer(); 
              }}><TiDeleteOutline /></button>
            </li>
          ))}
          <li>{list.length} items left</li>
        </ul>
      </div>
    </>
  );
}

export default App;