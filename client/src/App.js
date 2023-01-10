import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateChallenges from './pages/CreateChallenges';
import SignIn from './pages/SignIn';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from './context/StateProvider';
import { fetchUserData } from './api/api';
import { actionType } from './context/reducer';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './config/firebase.config';
// import StateProvider from './context/StateProvider';
// import firebase from 'firebase/compat';

function App() {

  const {state, dispatch} = useContext(StateContext);
  const {user, hackathons} = state;

  const firebaseAuth = getAuth(firebaseApp);

  const [auth,setAuth] = useState(false || window.localStorage.getItem('auth') === 'true');


  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userInfo)=>{
      // if(userInfo){
      //   userInfo.getIdToken().then((token)=>{
      //     console.log(token)
      //   })
      // }else{
      //   setAuth(false);
      //   window.localStorage.setItem('auth', 'false');

      // }

      console.log(userInfo.accessToken)
      

    })
  }, [])


console.log(firebaseAuth)

  return (
    <div className="">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home /> } />
          <Route path='/create-challenge' element={<CreateChallenges /> } />
          <Route path='/signin' element={<SignIn setAuth={setAuth} />} />
        </Routes>
    </div>
  );
}

export default App;
