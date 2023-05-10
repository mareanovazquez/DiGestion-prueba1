import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


import { ListProveedores } from './components/ListProveedores/ListProveedores'
import { ListaRemitos } from './components/ListaRemitos/ListaRemitos.jsx';
import { NavBar } from './components/NavBar/NavBar';
import { FooterNav } from './components/FooterNav/FooterNav';
import { BrowserRouter, Routes } from 'react-router-dom';
import { LogIn } from './components/LogIn/LogIn';
import { ItemListRemito } from './components/ItemListRemito/ItemListRemito.jsx';
import { ListaRemitos2 } from './components/ListaRemitos2/ListaRemitos2';
import { ItemRemito } from './components/ItemRemito/ItemRemito';
import { AddRemito } from './components/AddRemito/AddRemito';






function App() {


  return (
    <>

      <NavBar />
      {/*  <LogIn /> */}
      {/* <ListProveedores /> */}

      <AddRemito/>
     {/*   <ItemListRemito /> */}
      
      {/* <ItemRemito/> */}
      <FooterNav />

    </>
  )
}


export default App
