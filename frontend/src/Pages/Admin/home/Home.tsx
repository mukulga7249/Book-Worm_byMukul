import React from 'react';
import Sidebar from '../../../Components/Login/Admin/Sidebar/Sidebar';
import Navbar from '../../../Components/Login/Admin/Navbar/Navbar';
import Widget from '../../../Components/Login/Admin/Widget/Widget';


import './Home.css';

import PieActiveArc from '../../../Components/Login/Admin/PieChart/PieChart';
import PieActiveArcOrders from '../../../Components/Login/Admin/OrderChart/OrderChart';

const Home: React.FC = () => {
  

 
  return (
    <div className="home">
     
      
      <Sidebar/>
    
     
      <div className="homeContainer">
        
        
        <Navbar />
        <div className="widgets">
          <Widget type="SELLERS" />
          <Widget type="BUYERS" />
          <Widget type="BOOKS" />
          <Widget type="ORDERS" />
        </div>
        <div className="chart mt-5">
        

        <div className='chart-content'>
        <h4>  STATUS OF ORDERS</h4>
        <PieActiveArcOrders/>
         
          
        </div>

        <div className='chart-content'>
          <h4>LIVE LISTINGS BY GENRE</h4>
          
          <PieActiveArc/>
        </div>
          
       
       
    
      
      </div>

      </div>
    </div>
  );
};

export default Home;