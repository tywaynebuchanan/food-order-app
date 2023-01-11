import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Search from './components/Search';
import Modal from './components/Modal';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
   <main>
   <Router>
    <Search/>
    {/* <Favorites/> */}
    <Meals/>
    {/* <Modal/> */}
    </Router>
   </main>
  );
}

export default App;
