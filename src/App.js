import React, { useState, useEffect } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import './App.css';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState([]);
 
  const SERVER_URL =
  'https://playground.4geeks.com/apis/fake/todos/user/Anderson';
  const GET_HTTP_METHOD = 'GET';
  const PUT_HTTP_METHOD = 'PUT';
 
  

  const obtenerInfoServer = async () => {
 
      const response = await fetch(SERVER_URL, { method: GET_HTTP_METHOD });
      const data = await response.json();
      setList(data);

  }; 
  const createNewTodo = async (label) => {
    const newTodo = { label, id: '', done: false };
    const state = [...list, newTodo];
    await fetch(SERVER_URL, {
      method: PUT_HTTP_METHOD,
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await obtenerInfoServer();
  };
  const deleteTodo = async (label) => {
    const updatedList = list.filter((todo) => todo.label !== label);
    await fetch(SERVER_URL, {
                    method: PUT_HTTP_METHOD,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedList),
                  });
                 await obtenerInfoServer(); 
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
                  createNewTodo(inputValue);
                  setInputValue('');
                     }}
              }
              placeholder='What do you need to do?'
            />
          
          </li>
          {list.map(({id, done,label}, index) => (
            <li key={id}>
              {label}{' '}
              <button onClick={() => 
                  deleteTodo(label)
              }><TiDeleteOutline /></button>
            </li>
          ))}
          <li>{list.length} items left</li>
        </ul>
      </div>
    </>
  );
}

export default App;