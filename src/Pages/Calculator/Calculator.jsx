/* import './Calculator.css'

function Calculator() {
    return ( 
        <div className='calculater-container'>
            <h1>CACULATOR</h1>
        </div>
     );
}

export default Calculator; */

import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastOperand, setLastOperand] = useState(null); // เก็บตัวเลขก่อนหน้า
  const [lastResult, setLastResult] = useState(null); // เก็บผลลัพธ์ล่าสุด
  const [operatorPressed, setOperatorPressed] = useState(false);// ตรวจการกดเครื่องหมาย
  const [equalPressed, setEqualPressed] = useState(false);  // ตรวจการกดปุ่ม `=` หรือไม่

  useEffect(() => {
    clearDisplay();
  }, []);

   // ฟังก์ชันเพิ่มค่าหรือตัวเลขลงบนหน้าจอ
  const appendToDisplay = (value) => {
    if (display === '0' || operatorPressed) { // ถ้าแสดงผลเป็น '0' หรือมีการกดเครื่องหมาย
      setDisplay(value);  // แสดงค่าที่ถูกกด
      setOperatorPressed(false); // ลบสถานะการกดเครื่องหมาย
    } else {
      setDisplay(display + value); // ถ้าไม่ใช่ '0' หรือเครื่องหมายถูกกดแล้ว จะเพิ่มค่าใหม่ต่อท้าย
    }
  };

 // ฟังก์ชันกดเครื่องหมาย
  const handleOperator = (operator) => {
    const currentValue = parseFloat(display); // แปลงค่าที่แสดงบนหน้าจอเป็นตัวเลข
    if (display === '' || display === '0') {
      setLastOperand(0);
    } else {
      setLastOperand(currentValue);  // ถ้ามีค่าให้เก็บเป็น lastOperand
    }

    if (lastOperator && !operatorPressed) { // ถ้ามีเครื่องหมายก่อนหน้าและยังไม่ได้กดเครื่องหมายใหม่
      calculateResult();  // คำนวณผลลัพธ์
      
    }

    setLastOperator(operator);
    setOperatorPressed(true); // บันทึกว่ากดเครื่องหมาย
    setEqualPressed(false); // รีเซ็ตปุ่ม `=`
  };

   // ฟังก์ชันclearMemory
  const clearMemory = () => {
    setMemory(0);
    clearDisplay();
  };

  //ฟังก์ชันล้างล้างหน่วยความจำ
  const clearDisplay = () => {
    setDisplay('0');
    setLastOperator(null);
    setLastOperand(null);
    setLastResult(null);
    setOperatorPressed(false);
    setEqualPressed(false);
  };

 // ฟังก์ชันลบตัวเลขล่าสุดบนหน้าจอ
  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1)); // ลบตัวเลขตัวสุดท้ายออก
    } else {
      setDisplay('0');
    }
  };

  // ฟังก์ชันคำนวณผลลัพธ์ตามเครื่องหมายที่ถูกกด
  const calculateResult = () => {
    const currentValue = parseFloat(display); // แปลงค่าปัจจุบันที่แสดงบนหน้าจอเป็นตัวเลข

    // คำนวณตามเครื่องหมายที่ถูกกด
    if (lastOperator && lastOperand !== null) { 
      let result;
      switch (lastOperator) {
        case '+':
          result = (lastResult !== null ? lastResult : lastOperand) + currentValue; //ถ้าเคยมีผลลัพธ์ให้บวกต่อจากผลลัพธ์ ถ้าไม่มีก็ใช้ตัวเลขก่อนหน้า
          break;
        case '-':
          result = (lastResult !== null ? lastResult : lastOperand) - currentValue;
          break;
        case 'x':
          result = (lastResult !== null ? lastResult : lastOperand) * currentValue;
          break;
        case '÷':
          if (currentValue === 0) { // ถ้าหารด้วย 0 แสดง 'Error'
            setDisplay('Error');
      
            return;
          }
          result = (lastResult !== null ? lastResult : lastOperand) / currentValue;
          break;
        default:
          return;
      }

      setDisplay(result.toString());
      setLastResult(result);
      setLastOperand(equalPressed ? lastOperand : currentValue);// ถ้ากด `=` ใช้ตัวเลขเดิม ถ้าไม่ก็กำหนดตัวเลขปัจจุบัน
    }

    setOperatorPressed(true);
  };

// ฟังก์ชันกดปุ่ม `=`
  const handleEqual = () => {
    const currentValue = parseFloat(display); // แปลงค่าที่แสดงบนหน้าจอเป็นตัวเลข
    // ถ้ายังไม่ได้กด `=` มาก่อน
    if (!equalPressed) { 
      calculateResult();
      setEqualPressed(true); // บันทึกว่ากดปุ่ม `=`
    } else if (lastOperator && lastOperand !== null) {  // ถ้ากดแล้วให้คำนวณต่อไปตามเครื่องหมายเดิม
      let result = lastResult;
      switch (lastOperator) {
        case '+':
          result += lastOperand;
          break;
        case '-':
          result -= lastOperand;
          break;
        case 'x':
          result *= lastOperand;
          break;
        case '÷':
          if (lastOperand === 0) { 
            return;
          }
          result /= lastOperand;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setLastResult(result);
    }
  };

  // ฟังก์ชันรับค่าKeyboard
  const checkKeyboard = (e) => {
    switch (e.key) {
      case 'Escape':
        clearMemory();
        break;
      case 'Enter':
        handleEqual();
        break;
      case '+':
        handleOperator('+');
        break;
      case '-':
        handleOperator('-');
        break;
      case '*':
      case 'x':
        handleOperator('x');
        break;
      case '/':
      case '÷':
        handleOperator('÷');
        break;
      case '.':
        appendToDisplay('.');
        break;
      default:
        if (e.key >= '0' && e.key <= '9') {
          appendToDisplay(e.key);
        }
        break;
    }
  };

  //ปุ่มต่าง ๆ ของเครื่องคิดเลข
  useEffect(() => {
    window.addEventListener('keydown', checkKeyboard);
    return () => window.removeEventListener('keydown', checkKeyboard);
  }, [display, lastOperator, lastOperand, lastResult, operatorPressed]);

  return (
    <div className='calculator-container'>
        <div className="calculator-container-1">
            <input type="text" id="display" value={display} disabled />

            <div className="memory-buttons">
                <button className="memory-button">MC</button>
                <button className="memory-button">MR</button>
                <button className="memory-button">M+</button>
                <button className="memory-button">M-</button>
                <button className="memory-button">MS</button>
            </div>

            <div className="buttons">
                <button>%</button>
                <button onClick={clearMemory}>CE</button>
                <button onClick={clearDisplay}>C</button>
                <button onClick={deleteLast}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                    </svg>
                </button>
                <button>1/x</button>
                <button>x<sup>2</sup></button>
                <button><sup>2</sup>&radic;x</button>
                <button onClick={() => handleOperator('÷')}>&#247;</button>
                <button onClick={() => appendToDisplay('7')}>7</button>
                <button onClick={() => appendToDisplay('8')}>8</button>
                <button onClick={() => appendToDisplay('9')}>9</button>
                <button onClick={() => handleOperator('x')}>x</button>
                <button onClick={() => appendToDisplay('4')}>4</button>
                <button onClick={() => appendToDisplay('5')}>5</button>
                <button onClick={() => appendToDisplay('6')}>6</button>
                <button onClick={() => handleOperator('-')}>-</button>
                <button onClick={() => appendToDisplay('1')}>1</button>
                <button onClick={() => appendToDisplay('2')}>2</button>
                <button onClick={() => appendToDisplay('3')}>3</button>
                <button onClick={() => handleOperator('+')}>+</button>
                <button onClick={() => appendToDisplay('+/-')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-slash-minus" viewBox="0 0 16 16">
                        <path d="m1.854 14.854 13-13a.5.5 0 0 0-.708-.708l-13 13a.5.5 0 0 0 .708.708M4 1a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 4 1m10.5 9a.5.5 0 0 0 0-1h-10a.5.5 0 0 0 0 1h10m0 2.5a.5.5 0 0 1 0 1h-10a.5.5 0 0 1 0-1h10" />
                    </svg>
                </button>
                <button onClick={() => appendToDisplay('0')}>0</button>
                <button onClick={() => appendToDisplay('.')}>.</button>
                <button onClick={handleEqual}>=</button>
            </div>
        </div>
    </div>
  );
};

export default Calculator;
