import { useRef } from 'react';
import { Form } from 'react-router-dom';
import { verifyUser } from '../../data/users';
import './Login.css'

function Login( {setToken}) {

const userRef = useRef()
const passRef = useRef()

    return ( 
        <div className="login-container">
            <Form.labal htmlFor="username">Username</Form.labal>
            <Form.Control type="text" id="username" style={{TextAlign: 'center'}} placeholder="Enter Username" />

            <Form.labal className='mt-2' htmlFor="password">Password</Form.labal>
            <Form.Control 
            type="password" 
            id="password" 
            style={{TextAlign: 'center'}} placeholder="Enter Password" />

            <Form.button className="btn btn-success" type="submit" onClick={() => {
                const user = userRef.currnt.value
                const pass = passRef.current.value
                const userInfo =verifyUser(user,pass)

                if (userInfo ) {
                    alert('Login Success')
                } else {
                    alert('Login Failed')
                }
            }}>Login</Form.button>

        </div>
     );
}

export default Login;