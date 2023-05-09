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






function App() {


  return (
    <>

      <NavBar />
      {/*  <LogIn /> */}
      {/* <ListProveedores /> */}

      {/* <ListaRemitos /> */}
      {/* <ItemListRemito /> */}
      {/* <ListaRemitos2/> */}
      <FooterNav />

    </>
  )
}


export default App
