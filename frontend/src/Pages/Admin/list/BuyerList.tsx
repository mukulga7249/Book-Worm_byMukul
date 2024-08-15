import React from 'react';
import Sidebar from '../../../Components/Login/Admin/Sidebar/Sidebar';
import Navbar from '../../../Components/Login/Admin/Navbar/Navbar';
import './List.css';
import Buyertable from '../../../Components/Login/Admin/Datatable/BuyerTable';


const BuyerList: React.FC = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Buyertable/>
      </div>
    </div>
  );
};

export default BuyerList;
