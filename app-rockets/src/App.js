import { BrowserRouter,Routes,Route } from 'react-router-dom';
import List from './List/list';
import Header from './Header/header';
import Detail from './Detail/detail';

import { useEffect } from 'react';


function App() {
useEffect(()=>{
console.log("main ")

},[])


  return (
  
      <BrowserRouter>
        <Header/>
        <Routes>
          {console.log("main jxs")}
          <Route path = "/" element = {<List/>}></Route>      
          <Route path = "/rocketsList" element = {<Detail/>}></Route>  
          <Route path = "*" element = {<List/>}></Route>  
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;
