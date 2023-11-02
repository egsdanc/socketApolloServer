import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; 
import List from './screen/List';
import Add from './screen/Add';
import Detail from './screen/Detail';
import ChatApp from './screen/Socket';
import Messages from './screen/Messages';

function App() {
  return (
    <BrowserRouter >
    <div   className='nav'  >
      <nav >
        <ul className='nav ul'>
          <li  className='nav li'>
            <Link to="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link to="/ekle">Ekle</Link>
          </li>
         
        </ul>
      </nav>
      </div>      
             <div stye={{marginTop : 43}}>
      <Routes  >
        <Route path="/" element={<List />} /> 
        <Route path="/ekle" element={<Add />} /> 
        <Route path="/detay/:itemId" element={<Detail />} />
        <Route path="/ChatApp" element={<ChatApp />} /> 
        <Route path="/Messages" element={<Messages />} /> 



       </Routes>
       </div>
    </BrowserRouter>
   );
}

export default App;
