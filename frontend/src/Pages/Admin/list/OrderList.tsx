import React from 'react';
import Sidebar from '../../../Components/Login/Admin/Sidebar/Sidebar';
import Navbar from '../../../Components/Login/Admin/Navbar/Navbar';
import './List.css';
import Ordertable from '../../../Components/Login/Admin/Datatable/OrderTable';


const OrderList: React.FC = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Ordertable/>
      </div>
    </div>
  );
};

export default OrderList;
