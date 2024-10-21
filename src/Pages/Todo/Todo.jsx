import { useState, useEffect, useRef } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

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
      const todoSelected = todosRaw.find((todo) => todo.id === id)

      todoSelected.completed = true
      setTodosRaw( [...todosRaw] )
    }

    function addClick(id,title) {
      const newItem = {
        id,
        title,
        completed: false,
        userId: 1

      }

      setTodosRaw( [...todosRaw, newItem] )
    }


    //modal handlers
    const [show, setShow] = useState(false);


    const newIdRef = useRef();
    const newtitleRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



  return (
    <div className='todo-container'>

{/* modal */}
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
            <span className='bi bi-plus-lg'>&nbsp;Add todo</span>
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control type="text" autoFocus disabled 
              //หาค่าตัวเลขมาใส่หาค่ามากสุด แบบauto
              value={
                Number(todosRaw.reduce((prev, todo) => {
                  return todo.id > prev ? todo.id : prev
                },0)) + 1
              } 
              ref={newIdRef}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" autoFocus ref={newtitleRef}/>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className='bi bi-x-lg'>&nbsp;Canael</span>
          </Button>

          <Button variant="primary" onClick={ () => {
            //ดึงค่า id title
            const id = newIdRef.current.value
            const title = newtitleRef.current.value.trim()
            if (title === '') {
              alert('Title cannot be empty')
              newtitleRef.current.value = ''
              newtitleRef.current.focus()
            } else{
               addClick(id,title)
            handleClose()
            }
          }}>
           <span className='bi bi-plus-lg'>&nbsp;Add</span> 
          </Button>
      </Modal.Footer>
      </Modal>

{/* filters */}
<div className='todo-filters-container'>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* form-check form-switch */}
    <div className='form-check form-switch'>
      <input
        className='form-check-input'
        type='checkbox'
        role='switch'
        id='flexSwitchCheckChecked'
        onChange={(e) => setOnlyWaiting(e.target.checked)}
        ref={onlyWaitingRef}
      />
      <label className='form-check-label' htmlFor='flexSwitchCheckChecked'>
        Show only&nbsp;
      </label>
    </div>

    {/* ปุ่ม waiting */}
    <button className='btn btn-warning' style={{ marginLeft: '10px' }}>
      waiting&nbsp;
      <span className='bi bi-clock'></span>
    </button>
  </div>

  {/* per page */}
  <select
    className='form-select'
    aria-label='Default select example'
    defaultValue={5}
    style={{ width: '200px' }}
    onChange={(e) => setItemsPerPage(e.target.value)}
    ref={itemsPerPageRef}
  >
    <option value={5}>5 items per page</option>
    <option value={10}>10 items per page</option>
    <option value={50}>50 items per page</option>
    <option value={100}>100 items per page</option>
  </select>
</div>

{/* table */}
      <table className='table table-striped todo-table' >
        <thead className='table-dark'>
          <tr>
            <th style={{width:'5%'}} valign = 'middle'>ID</th>
            <th valign = 'middle'>TITLE</th>
            <th style={{ textAlign: 'right', width: '20%' }} valign = 'middle'>
              COMPLETED&nbsp;
              <button className='btn btn-primary' onClick={() =>  handleShow() }>
                {/* ADD */}
                <span className='bi bi-plus-lg'></span>
                </button>
            </th>
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
                <td valign = 'middle'>
                  <span
                    className='badge bg-secondary'
                    style={{ width: '3rem' }}
                  >
                    {todo.id}
                  </span>
                </td>
                <td style={{ textAlign: 'left' }} valign = 'middle'>{todo.title}</td>

                <td style={{ textAlign: 'right' }} valign = 'middle'>

              {/* ส่วน done waiting trash */}
                  {todo.completed ? (
                    <span className='badge bg-success'>
                      done&nbsp;
                      <span className='bi bi-check'></span>
                    </span>
                  ) : (
                    <button className='btn btn-warning' onClick={() =>waitingClick(todo.id)}>
                      waiting&nbsp;
                      <span className='bi bi-clock'></span>
                    </button>
                  )}
                  &nbsp;
                  {/* ปุ่มลบ */}
                  <button className='btn btn-danger' onClick={ () =>deleteClick(todo.id)}>
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
          onClick={() =>setCurPage(1)}
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
          onClick={() =>setCurPage(numPages)}
          disabled={curPage >= numPages}
        >
          Last
        </button>
      </div>
    </div>
  )
}

export default Todo
