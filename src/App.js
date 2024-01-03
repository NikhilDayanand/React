import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  //UseEffect
  useEffect(() => {
    const getTasks = async () => {
     try {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      
     } catch (error) {
      console.log('error',error);
     }

    }
    getTasks()

  }, [])


  //Fetch Tasks

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  //Fetch Task with ID
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
  //Add Task
  const addTask = async (task) => {
    // console.log(task)
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST', headers: {
        'Content-type': 'application/json'
      }, body: JSON.stringify(task)
    })
    const data = await res.json()

    setTasks([...tasks, data])


  }
  //Delete Task
  const deleteTasks = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    // console.log('delete',id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', headers: {
        'Content-type': 'application/json'
      }, body: JSON.stringify(updTask)
    })

    const data = await res.json()
    // console.log(id)
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }


  return (

    <Router>
      <div className="container" >
        <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {/* {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTasks} onToggle={toggleReminder} />) : ('No Tasks To Show')} */}

        <Routes>
          <Route path="/" element={<Home showAddTask={showAddTask} tasks={tasks}/>} />
          <Route path="/about" Component={About} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );

  function Home({ showAddTask, tasks }) {
    return (
      <>
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTasks} onToggle={toggleReminder} /> : 'No Tasks To Show'}
      </>
    );
  }
}



export default App;
