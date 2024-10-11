import { useEffect, useState } from 'react';
import { fetchTodos } from '../../data/todo';
import './Todo.css'

function Todo() {
    //todosRaw -> filters -> todos-> display
    //read todosRaw

const [todosRaw, setTodosRaw] = useState([])  
    //filters
const [onlywaiting, setOnlywaiting] = useState(false)

const [numPage, setNumpage] = useState(0)

    
useEffect(() => {
    setNumpage(Math.ceil(todos.length / itemsPerPage))
}, [itemsPerPage, todos.length])

//todos
const [todos, setTodos] = useState([])

    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, []) //load

    useEffect(() => {
        console.log('', )
    }, [onlywaiting])

    useEffect(() => {
        console.log(todosRaw)
    }, [todosRaw])//ตรวจสอบข้อมูล หลังโหลด passfilters

    return ( 
        <div className='todo-container'>
            <h1>TODO</h1>
            <div></div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Default checkbox
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked
                />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked checkbox
                </label>
            </div>
            

            <div className="form-floating">
  <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
    
    <option value={5}> 5 items per page{numPage}</option>
    <option value={10}>10 items per page</option>
    <option value={50}>50 items per page</option>
    <option value={100}>100 items per page</option>
  </select>
</div>  

        <table className='table'>
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th style={{textAlign: 'right'}}>completed</th>
                </tr>
            </thead>
        </table>
        <tbody>
            <tr>
            <td><span className='badge bg-secondary'></span>1</td>
            <td style={{textAlign: 'left'}}>ตั้งใจ</td>
            <td style={{textAlign: 'right'}} >
                <span className="badge bg-warning">
                    waiting&nbsp;
                    <span className='bi bi-clock'> </span>
                    </span>
                    &nbsp;
                    </td>
                
                <span className='bi bi-clock'> </span>
            </tr>

            <tr>
            <td>1</td>
            <td>ตั้งใจ</td>
            <td style={{textAlign: 'right'}} >ยังไม่</td>
            </tr>

            {todos.map((todo) => {
                return(
                <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td style={{textAlign: 'right'}}>{todo.completed ? 'yes' : 'no'}</td>
                </tr>
            )})} 

        </tbody>
            
            {/* page control */}

            <div>
                <button className='btn btn-outline-primary todo-spacing' >
                   onClick={() => {setCurPage(1)}} first</button>
                <button className='btn btn-outline-primary todo-spacing'>
                   onClick={() => {curPage > 1 && setCurPage(curPage - 1)}} previous</button>
                <span className='todo-spacing'>{curPages}&nbsp;/&nbsp;{numPages}</span>
                <button className='btn btn-outline-primary todo-spacing'>
                   onClick={() => {curPage < numPages && setCurPage(curPage + 1)}} next</button>
                <button className='btn btn-outline-primary todo-spacing'>
                   onClick={() => {setCurPage(numPages)}} last</button>
            </div>
       
        </div>
        
     );
}

export default Todo;
