import React from 'react';
import Sidebar from '../../../Components/Login/Admin/Sidebar/Sidebar';
import Navbar from '../../../Components/Login/Admin/Navbar/Navbar';
import './List.css';
import SellerTable from '../../../Components/Login/Admin/Datatable/SellerTable';


const SellerList: React.FC = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <SellerTable/>
      </div>
    </div>
  );
};

export default SellerList;
