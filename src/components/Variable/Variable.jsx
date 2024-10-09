import PropTypes from 'prop-types'; // นำเข้า PropTypes


import './Variable.css'

function Variable ({type, name, value, setValue}) {
    
    //ไว้เปลี่ยนค่า
    

    return ( 
    <div className='counter-container'>
        <h3 className='counter-title'>{name || 'COUNTER'}</h3>
        <button className='btn btn-danger' onClick={  () => setValue(value - 1)}>&minus;</button>
        <span className='counter-value'>{type && type === 'int' ?  parseInt(value) : value.toFixed(2)}</span>
        <button className='btn btn-success' onClick={ () => setValue (value + 1)}> + </button>
    </div>
    ) 
}

// กำหนด prop types
Variable.propTypes = {
    type: PropTypes.number,
    name: PropTypes.number,
    value: PropTypes.number,
    setValue: PropTypes.number,
};


export default Variable;