import React, { useEffect, useState } from 'react';
import './Animation.css';

function Animation() {
  const fieldwidth = 700;
  const fieldheight = 400;
  const ballSize = 150;
  const vX = 5;
  const vY = 5;
  const maxX = fieldwidth - ballSize - 2;
  const maxY = fieldheight - ballSize - 2;
  const rotationSpeed = 5;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ goRight: true, goDown: true });
  const [rotation, setRotation] = useState(0);
  const [running, setRunning] = useState(false);
  const [ballImage, setBallImage] = useState(''); // เก็บรูปของลูกบอล
  const [tab, setTab] = useState(''); // สร้าง state สำหรับ tab

  const runClick = () => {
    setRunning(!running);
  };

  const calculate = () => {
    let { x, y } = position;
    let { goRight, goDown } = direction;

    if (goRight) {
      x += vX;
      if (x > maxX) goRight = false;
    } else {
      x -= vX;
      if (x < 0) goRight = true;
    }

    if (goDown) {
      y += vY;
      if (y > maxY) goDown = false;
    } else {
      y -= vY;
      if (y < 0) goDown = true;
    }

    setPosition({ x, y });
    setDirection({ goRight, goDown });
    setRotation((rotation + rotationSpeed) % 360);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) calculate();
    }, 40);

    return () => clearInterval(interval);
  }, [running, position, direction]);

  // ฟังก์ชัน render ใน React
  useEffect(() => {
    const btn = document.getElementById('run');
    if (running) {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-warning');
      btn.innerHTML = '<span class="bi bi-pause-fill">&nbsp;PAUSE</span>';
    } else {
      btn.classList.remove('btn-warning');
      btn.classList.add('btn-success');
      btn.innerHTML = '<span class="bi bi-play-fill">&nbsp;RUN</span>';
    }
  }, [running]);

  const changeBallImage = (image, tabName) => {
    setBallImage(image); // อัปเดตรูปของลูกบอล
    setTab(tabName); // อัปเดต tab เมื่อปุ่มถูกคลิก
  };

  // ฟังก์ชันเช็คคีย์บอร์ด
  const checkKeyboard = (e) => {
    if (e.key === ' ') {
      setRunning((prevRunning) => !prevRunning); // ใช้ฟังก์ชัน callback เพื่ออ้างถึงสถานะก่อนหน้า
    } else if (e.key === '0') {
      changeBallImage('node', 'node');
    } else if (e.key === '1') {
      changeBallImage('basketball.png', 'basketball');
    } else if (e.key === '2') {
      changeBallImage('Football.png', 'football');
    } else if (e.key === '3') {
      changeBallImage('Volleyball.png', 'volleyball');
    } else if (e.key === '4') {
      changeBallImage('Human.png', 'human');
    } else if (e.key === '5') {
      changeBallImage('Cartoon.png', 'cartoon');
    } else if (e.key === '6') {
      changeBallImage('Logo.png', 'logo');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', checkKeyboard);
    return () => {
      window.removeEventListener('keydown', checkKeyboard);
    };
  }, []);

  return (
    <div id="container">
      <div id="field" style={{ width: fieldwidth, height: fieldheight }}>
        <div
          id="ball"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `rotate(${rotation}deg)`,
            width: `${ballSize}px`,
            height: `${ballSize}px`,
            backgroundImage: `url(./${ballImage})`,
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
      <div id="control">
        <button id="run" className="btn btn-success" onClick={runClick}>
          <span className="bi bi-play-fill">&nbsp;RUN</span>
        </button>&nbsp;
        <button
          className={"btn " + (tab === "node" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => changeBallImage('node', 'node')}
        >
          Node
        </button>&nbsp;
        <button
          className={"btn " + (tab === "basketball" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => changeBallImage('basketball.png', 'basketball')}
        >
          Basketball
        </button>&nbsp;
        <button
          className={"btn " + (tab === "football" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => changeBallImage('Football.png', 'football')}
        >
          Football
        </button>&nbsp;
        <button
          className={"btn " + (tab === "volleyball" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => changeBallImage('Volleyball.png', 'volleyball')}
        >
          Volleyball
        </button>&nbsp;
        <button
          className={"btn " + (tab === "human" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => changeBallImage('Human.png', 'human')}
        >
          Human
        </button>&nbsp;
        <button
          className={"btn " + (tab === "cartoon" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => changeBallImage('Cartoon.png', 'cartoon')}
        >
          Cartoon
        </button>&nbsp;
        <button
          className={"btn " + (tab === "logo" ? "btn-primary" : "btn-outline-primary")}
          onClick={() => changeBallImage('Logo.png', 'logo')}
        >
          Logo
        </button>
      </div>
    </div>
  );
}

export default Animation;
