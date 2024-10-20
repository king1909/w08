import { useEffect, useState } from "react";

import Home from "./Pages/Home/Home";
import Calculator from "./Pages/Calculator/Calculator";
import Animation from "./Pages/Animation/Animation";
import Components from "./Pages/Components/Components";
import Todo from "./Pages/Todo/Todo";
import Products from "./Pages/Products/Products";


import Layout from "./layouts/Layout/Layout";

import { HashRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Carts from "./Pages/Carts/Carts";

/* browserRouter, HashRouter,  MemoryRouter */

// localhost:5174/<path> BrowserRouter *
// localhost:5174/#/<path> HashRouter * compatable
// localhost:5174/<path> MemoryRouter

// App**->Laout->Navber(buttons)
//tap ->(prop)

const intTab = 'home'

function App() {

  const [tab, setTab] = useState('')

  useEffect(() => {
      setTab(intTab)
  }, []) //first load

  return (
    <div className="app-container">
      <HashRouter>
        <Routes>
          <Route element={<Layout tab = {tab} setTab = {setTab} />}>
            <Route path={'/'} element={<Home />} />
            {/* Route ไปยังหน้าต่างๆและแสดง */}
            <Route path = {'/home'} element={<Home />} />
            <Route path = {'/calculator'} element={<Calculator/>} />
            <Route path = {'/Animation'} element = {<Animation/>} />
            <Route path = {'/components'} element = {<Components/>} />
            <Route path = {'/todo'} element={<Todo />} />
            <Route path = {'/products'} element = {<Products/>} />
            <Route path = {'/carts'} element = {<Carts/>} />
          </Route>
        </Routes>
      </HashRouter>

    </div>
  );
}

export default App;
