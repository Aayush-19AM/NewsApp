
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { useState } from 'react'

import {
  BrowserRouter,
  Routes, // Switch has been replaced by Routes
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const pageSize=15;
  const apiKey=process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)
  
    return (
      <div>   
       
     <BrowserRouter>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="Entertainment" pageSize={pageSize} country='in' category='Entertainment'/>}/>
          <Route  path="/Entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="Entertainment" pageSize={pageSize} country='in' category='Entertainment'/>}/>
          <Route  path="/General" element={<News setProgress={setProgress} apiKey={apiKey} key="General" pageSize={pageSize} country='in' category='General'/>}/>
          <Route  path="/Business" element={<News setProgress={setProgress} apiKey={apiKey} key="Business" pageSize={pageSize} country='in' category='Business'/>}/>
          <Route  path="/Health" element={<News setProgress={setProgress} apiKey={apiKey} key="Health" pageSize={pageSize} country='in' category='Health'/>} />
          <Route  path="/Science" element={<News setProgress={setProgress} apiKey={apiKey} key="Science" pageSize={pageSize} country='in' category='Science'/>}/>
          <Route  path="/Sports" element={<News setProgress={setProgress} apiKey={apiKey} key="Sports" pageSize={pageSize} country='in' category='Sports'/>}/>
          <Route  path="/Technology"element={<News setProgress={setProgress} apiKey={apiKey} key="Technology" pageSize={pageSize} country='in' category='Technology'/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    )
    }
    export default App;



