import React from 'react';

import './App.css';
import logo from './logo.png';
import  background  from './background.png'

function App() {
  return (
    <body>

      <div className='container' >
        

        <div className=' left-column'>
         
         
          <div className='background' style={{backgroundImage: `url(${background})`} } />
          <img src={logo} style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}/>
          
         
         
        </div>
      <div className='right-column'>
      
        <button> Already member? </button>
        <input type="email" id='email' name="email" placeholder='Email address' />
        <input type="password" id="password "name="password" placeholder='Password' />
        <input type="password" id="password" name="password" placeholder='Confirm Password'/>
        <button type="submit" >Sign Up</button>
        </div>
    </div>     
      
    </body>
    
  );
}

export default App;
