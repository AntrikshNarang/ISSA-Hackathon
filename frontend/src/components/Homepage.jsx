
import React from 'react';
import Login from '@react-login-page/page9';
import LoginBg from '@react-login-page/page9/bg.jpg';;

const Homepage = () => {
  return (
    <div style={{width: "100vw", height: "100vh"}}>
        <Login style={{ height: 580, backgroundImage: `url(${LoginBg})` }} />
    </div>
    
  );
};
export default Homepage;