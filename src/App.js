import React, { useState, useEffect } from 'react';
import './App.css';
import * as Constants from './constants';
import axios from 'axios';

function App() {

  const [data, setData] = useState({ todos: [] })

  useEffect(() => {
    const fetchData = async () => {
      const queryResult = await axios.post(
        Constants.GRAPHQL_API, {
          query: Constants.QUERY
        }
      )  
      
      const { todos } = queryResult.data.data;
      console.log(queryResult.data.data)
      setData({ todos })
    }
    fetchData();
  })

  const renderDone = (done) => {
    if (done)
      return <p>True Returned</p>;
    return <p>False Returned</p>;
  }

  return (
    <div className="App">
      <h1>LIST OF TODOS</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {data.todos.map(todo => (
            <tr key={todo.test}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{renderDone(todo.done)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
