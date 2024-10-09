import { Outlet } from "react-router";

import Header from "../Header/Header";
import Navber from "../Navbar/Navber";
import Footer from "../Footer/Footer";

import './Layout.css'

function Layout({tab, setTab}) {
    return ( 
        <div>
            <Header/>
            <Navber tab = {tab} setTab = {setTab}/>
            <Outlet/>
            <Footer/>
        </div>
     );
}

export default Layout;