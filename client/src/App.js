import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateChallenges from './pages/CreateChallenges';


function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/create-challenge' element={<CreateChallenges /> } />
      </Routes>
    </div>
  );
}

export default App;
