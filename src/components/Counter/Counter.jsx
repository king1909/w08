

import { useState } from 'react'
import PropTypes from 'prop-types';
import './Counter.css'

function Counter(props) {
    
    //ไว้เปลี่ยนค่า
    
    const [value, setValue] = useState(props.value || 0)

    function increment(){
        setValue (value + 1)
        console.log(value)
    }

    function decrement(){
        setValue(value - 1)
        console.log(value)
    }


    return ( 
    <div className='counter-container'>
        <h3 className='counter-title'>{props.name || 'COUNTER'}</h3>
        <button className='btn btn-danger' onClick={decrement}>-</button>
        <span className='counter-value'>{value}</span>
        <button className='btn btn-success' onClick={increment}>+</button>
    </div>
    ) 
}

Counter.propTypes = {
    value: PropTypes.number,
    name: PropTypes.string
}


export default Counter;