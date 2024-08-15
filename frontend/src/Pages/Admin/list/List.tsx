import React from 'react';
import Sidebar from '../../../Components/Login/Admin/Sidebar/Sidebar';
import Navbar from '../../../Components/Login/Admin/Navbar/Navbar';
import Datatable from '../../../Components/Login/Admin/Datatable/Datatable';
import './List.css';

const List: React.FC = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
