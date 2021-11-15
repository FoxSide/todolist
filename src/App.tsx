import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterType = 'All' | 'Active' | 'Completed'

function App() {

  const [tasks1, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "ReactJS", isDone: false},
    {id: 5, title: "ReactJS", isDone: false}
  ])


  const removeTask = (mId: number) => {
    setTasks(tasks1.filter(t => t.id !== mId))
  }

  const [filter, setMyFilter] = useState<filterType>('All')

  const setFilter = (value: filterType) => {
    setMyFilter(value)
  }


  let newTask = filter === 'Active' ? tasks1.filter(f => f.isDone) : filter === 'Completed' ? tasks1.filter(f => !f.isDone) : tasks1

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={newTask}
        removeTask={removeTask}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
