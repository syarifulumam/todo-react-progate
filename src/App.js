import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [title,setTitle] = useState('')
  const [id,setId] = useState('')
  const [done,setDone] = useState('')
  const [data,setData] = useState([])
  
  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem('todo'));
    if (todos !== null) {
      setData(todos)
    }
  }, [])

  const titleHandler = (e) => {
    setTitle(e)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    let newData 
    if (id === '') {
      newData = [...data,{id: +new Date(), title: title, done: false}]
    } else {
      let filterData = data.filter(item => item.id !== id)
      newData = [...filterData,{id: id, title: title, done: done}]
    }
    setData(newData)
    localStorage.setItem('todo', JSON.stringify(newData));
    setTitle('')
    setId('')
    setDone('')
  }

  const selesaiHandler = (e) => {
    let newData
    let filterData = data.filter(item => item.id !== e.id)
    if (e.done === false) {
      newData = [...filterData,{id: e.id, title: e.title, done: e.done === false ? true : true}]
    } else {
      newData = [...filterData,{id: e.id, title: e.title, done: e.done === false ? true : false}]
    }
    console.log(newData);
    setData(newData)
    localStorage.setItem('todo', JSON.stringify(newData));
  }

  const updateHandler = (e) => {
    setTitle(e.title)
    setId(e.id)
    setDone(e.done)
  }

  const deleteHandler = (e) => {
    let deleteData = data.filter(item => item.id !== e.id)
    setData(deleteData)
    localStorage.setItem('todo', JSON.stringify(deleteData));

  }

  return (
    <div className="App">
      <div className="todo-form">
        <form onSubmit={submitHandler}>
            <input type="text" value={title} onChange={(e) => titleHandler(e.target.value)} name="" id="" placeholder='Create todo' className='todo-form__input'/>
            <button type='submit' className='todo-form__button'>{id === '' ? 'Create' : 'Update'}</button>
        </form>
      </div>
      <div className="todo-list">
        <table>
          <tbody>
          {data.map(list => (
            <tr key={list.id}>
              <td><p className='todo-list__title'>{list.title}</p></td>
              <td>
                <button onClick={() => selesaiHandler(list)}>{list.done === true ? "Selesai" : "Belum Selesai"}</button>
                <button onClick={() => updateHandler(list)}>Update</button>
                <button onClick={() => deleteHandler(list)}>X</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
