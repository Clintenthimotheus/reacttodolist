import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch todos data for the logged-in user when the component mounts
    const username = sessionStorage.getItem('username');

    if (username) {
      fetch(`http://localhost:3000/users?username=${username}`)
        .then((response) => response.json())
        .then((users) => {
          const currentUserTodos = users[0]?.todos || [];
          setTodos(currentUserTodos);
        })
        .catch((error) => console.error('Error fetching todos:', error));
    }
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const username = sessionStorage.getItem('username');

      if (username) {
        fetch(`http://localhost:3000/users?username=${username}`)
          .then((response) => response.json())
          .then((users) => {
            const userId = users[0]?.id;

            const newTodoItem = {
              id: Math.random().toString(), // Use a unique ID (this is just an example)
              text: newTodo.trim(),
              checked: false,
            };

            // Update the todos in the server
            fetch(`http://localhost:3000/users/${userId}`, {
              method: 'PATCH', // Use PATCH to update existing data
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ todos: [...todos, newTodoItem] }),
            })
              .then((response) => response.json())
              .then((updatedUserData) => {
                setTodos(updatedUserData.todos);
                setNewTodo('');
              })
              .catch((error) => console.error('Error adding todo:', error));
          })
          .catch((error) => console.error('Error fetching user:', error));
      }
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    const deletedTodo = newTodos.splice(index, 1)[0]; // Remove the todo and get the deleted todo
    setTodos(newTodos);
  
    const username = sessionStorage.getItem('username');
    if (username) {
      fetch(`http://localhost:3000/users?username=${username}`)
        .then((response) => response.json())
        .then((users) => {
          const userId = users[0]?.id;
  
          // Update the todos on the server after deleting the todo locally
          fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              todos: newTodos,
            }),
          })
            .then((response) => response.json())
            .then((updatedUserData) => {
              console.log('Todo deleted successfully on the server:', deletedTodo);
            })
            .catch((error) => console.error('Error updating todos on the server:', error));
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  };
  
  
  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  return (
    <div className='contain'>
      <Link to={'/'}><button className='logout'>Log out</button></Link>
      <h1>To-do List</h1>
      <input
        placeholder="Type..."
        className='input'
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className='button' onClick={handleAddTodo}>
        Add
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleToggleTodo(index)}
            />
            <span style={{
              marginLeft: '10px',
              marginRight: '10px',
              textDecoration: todo.checked ? 'line-through' : 'none',
              flex: 1,
            }}>{todo.text}</span>
            <button
              style={{ marginBottom: '10px', marginTop: '5px' }}
              className='btn'
              onClick={() => handleDeleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
