import { Link } from "react-router-dom";
import "./Navber.css";

function Navber({ tab, setTab }) {
  return (
    <div className="navber-container">

    {/* สร้างปุ่ม HOME และlinkหน้าเพื่อกด */}
    <Link to = {'/home'}>
      <button
        className={
          "btn " + (tab === "home" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('home')}}
      >
        Home
      </button>
      </Link>

      {/* เปิดปิด ฟังก์ฟันตาทRole
        {role !== 'user' &&(

        )} */}
    {/* สร้างปุ่ม calculator */}
      <Link to = {'/calculator'}>
      <button className={
          "btn " + (tab === "calculator" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('calculator')}}
      >Calculator
      </button>
      </Link>

    {/* สร้างปุ่ม animation */}
    <Link to = {'/animation'}>
      <button className={
          "btn " + (tab === "animation" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('animation')}}
      >Animation
      </button>
      </Link>

    {/* สร้างปุ่ม components */}
      <Link to = {'/components'}>
      <button className={
          "btn " + (tab === "components" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('components')}}
      >Components
      </button>
      </Link>

    {/* สร้างปุ่ม todo */}
      <Link to = {'/todo'}>
      <button className={
          "btn " + (tab === "todo" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('todo')}}
      >Todo
      </button>
      </Link>

      {/* สร้างปุ่ม products */}
      <Link to = {'/products'}>
      <button className={
          "btn " + (tab === "products" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('products')}}
      >Products
      </button>
      </Link>

      {/* สร้างปุ่ม Carts */}
      <Link to = {'/carts'}>
      <button className={
          "btn " + (tab === "carts" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('carts')}}
      >Carts
      </button>
      </Link>

      {/* สร้างปุ่ม Carts */}
      <Link to = {'/carts'}>
      <button className={
          "btn " + (tab === "carts" ? "btn-primary" : "btn-outline-primary")
        }
        onClick={() => {setTab('carts')}}
      >Carts
      </button>
      </Link>


    </div>
  );
}

export default Navber;
