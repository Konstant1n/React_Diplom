// import './App.css';
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginThunk, initThunk } from './store/thunks';
// import Auth from './pages/Auth';
// import Application from './pages/Application';
// import CircularStatic from './components/CircularStatic/CircularStatic';


// const App = () => {
//   const isAuth = useSelector((state) => state.user.isAuth);
//   const isLoading = useSelector(state => state.ui.isLoading)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(initThunk());
//   }, [])

//   if(isLoading) {
//     return <CircularStatic/>
//   }

//   return isAuth ? <Application/> : <Auth/>
// }

// export default App;


import './App.css';
import React, {useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initThunk } from './store/thunks';
import Auth from './pages/Auth';
import Application from './pages/Application';
import CircularStatic from './components/CircularStatic/CircularStatic';


const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isLoading = useSelector(state => state.ui.isLoading)
  const dispatch = useDispatch();
// eslint-disable-next-line
  useLayoutEffect(() => {
    dispatch(initThunk());
    // eslint-disable-next-line
  }, [])
  
  const renderContent = () => {
    if(isLoading) {
      return <CircularStatic/>
    } else if (isAuth) {
      return <Application/>
    } else {
      return <Auth/>
    }
  }

  return renderContent();
}


export default App;