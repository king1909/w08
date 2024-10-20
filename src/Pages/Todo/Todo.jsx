import { useState, useEffect, useRef } from 'react'
import { fetchTodos } from '../../data/todos'

import './Todo.css'

const initItemsPerPage = 5
const initOnlyWaiting = false

function Todo() {
  // todosRaw -> filters -> todos -> display
  //todoRaw
  const [todosRaw, setTodosRaw] = useState([])
  //filter
  const [onlyWaiting, setOnlyWaiting] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(0)
  //todos
  const [todos, setTodos] = useState([])
  //display
  const [numPages, setNumPages] = useState(0)
  const [curPage, setCurPage] = useState(0)

  const itemsPerPageRef = useRef()
  const onlyWaitingRef = useRef()

  useEffect(() => {
    const todosData = fetchTodos();  // ดึงข้อมูล todos
    console.log(todosData);  // ตรวจสอบข้อมูลที่ดึงออกมา
    setTodosRaw(todosData);  // ตั้งค่า todosRaw ด้วยข้อมูลที่ดึงมา
    setOnlyWaiting(initOnlyWaiting);
    itemsPerPageRef.current.value = initItemsPerPage;
    setItemsPerPage(initItemsPerPage);
    onlyWaitingRef.current.checked = initOnlyWaiting;
  }, []);

 // checked  onlyWaiting เปลี่ยน จะทำฟังก์ชันนี้
  useEffect(() => {
    if (onlyWaiting) {
      //show onlyWaiting
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      //show all
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting, itemsPerPage]);

  // select  per page
  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage)) //เปลี่ยนค่าper page
  }, [todos, itemsPerPage])

  //คำนวนหน้าปัจจุบัน ดูหน้าทั้งหมดเท่าไร
  useEffect(() => {
    if (numPages <= 0) setCurPage(0)
    else if (curPage === 0) setCurPage(1)
    else if (curPage > numPages) setCurPage(numPages)
  }, [numPages])

  //consoleแสดงสเตจที่ถูกเปลื่ยน setหน้าที่เลือก per page
  useEffect(() => {
    console.log('itemsPerPage: ',itemsPerPage)
  }, [itemsPerPage])

  //event handlers delete
    function deleteClick(id,) {
      setTodosRaw(todosRaw.filter( (todo) =>todo.id !== id))

    }

  // ฟังก์ชั่น waitingClick 
    function waitingClick(id) {
      const todoSelected = todosRaw.find((todo) => {
        return todo.id === id
      })
      todoSelected.completed = true
      setTodosRaw( [...todosRaw] )
    }

  return (
    <div className='todo-container'>
{/* filters */}
      <div className='todo-filters-container'>

      {/* form-check form-switch */}
        <div className='form-check form-switch'>
          <input
            className='form-check-input'
            type='checkbox'
            role='switch'
            id='flexSwitchCheckChecked'
            // checked Show only waiting
            onChange={(e) => {
              setOnlyWaiting(e.target.checked)
            }}
            ref={onlyWaitingRef}
          />

          <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
            Show only&nbsp;
            <button className='btn btn-warning'>
              waiting&nbsp;
              <span className='bi bi-clock'></span>
              </button>

          </label>
        </div>

        {/* per page */}
        <select
          className='form-select'
          aria-label='Default select example'
          defaultValue={5}
          style={{ width: '200px' }}
          onChange={(e) => {
            /* console.log(e.target.value) */
            setItemsPerPage(e.target.value)
          }}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>

{/* table */}
      <table className='table table-striped todo-table'>
        <thead className='table-dark'>
          <tr>
            <th style={{width:'10%'}}>ID</th>
            <th>Title</th>
            <th style={{ textAlign: 'right' }}>Completed</th>
          </tr>
        </thead>

        <tbody>
          {
          // itemaPrePage = 5
          // curPage = 1
          // item (js) = [0....4] -> [min....max] 
          // min = (curPage - 1) * itemsPerPage
          // max = curPage * itemsPerPage - 1
          //ฟังก์ชั่น แสดงรายการตามที่เลือก perpage
            todos.filter((todo, index) => {

              const min = (curPage - 1) * itemsPerPage
              const max = curPage * itemsPerPage - 1

              return index >= min && index <= max
            })
          
          .map((todo) => {
            return (
              <tr key={todo.id}>
                <td>
                  <span
                    className='badge bg-secondary'
                    style={{ width: '3rem' }}
                  >
                    {todo.id}
                  </span>
                </td>
                <td style={{ textAlign: 'left' }}>{todo.title}</td>
                <td style={{ textAlign: 'right' }}>

              {/* ส่วน done waiting trash */}
                  {todo.completed ? (
                    <span className='badge bg-success'>
                      done&nbsp;
                      <span className='bi bi-check'></span>
                    </span>
                  ) : (
                    <button className='btn btn-warning' onClick={() => {

                      waitingClick(todo.id)

                    }}>
                      waiting&nbsp;
                      <span className='bi bi-clock'></span>
                    </button>
                  )}
                  &nbsp;
                  {/* ปุ่มลบ */}
                  <button className='btn btn-danger' onClick={ () => { 
                    deleteClick(todo.id)
                  } }>
                    <span className='bi bi-trash'></span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

{/* page control */}
      <div>

      {/* ปุ่ม First */}
        <button
          className={
            'todo-space btn ' +
            (curPage <= 1 ? 'btn-outline-secondary' : 'btn-outline-primary')
          }
          onClick={() => {
            setCurPage(1)
          }}
          disabled={curPage <= 1} //เมื่อหน้าเป็น 1 จะปิดการใช้งาน
        >
          First
        </button>

        {/* ปุ่ม Previous */}
        <button
          className={
            'todo-space btn ' +
            (curPage <= 1 ? 'btn-outline-secondary' : 'btn-outline-primary')
          }
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </button>

        {/* ส่วนที่แสดง "/" */}
        <span className='todo-space'>
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>

         {/* ปุ่ม Next */}
        <button
          className={
            'todo-space btn ' +
            (curPage >= numPages
              ? 'btn-outline-secondary'
              : 'btn-outline-primary')
          }
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </button>

        {/* ปุ่ม Last */}
        <button
          className={
            'todo-space btn ' +
            (curPage >= numPages
              ? 'btn-outline-secondary'
              : 'btn-outline-primary')
          }
          onClick={() => {
            setCurPage(numPages)
          }}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  )
}

export default Todo
