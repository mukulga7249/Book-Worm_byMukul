import React from 'react';
import Sidebar from '../../../Components/Login/Admin/Sidebar/Sidebar';
import Navbar from '../../../Components/Login/Admin/Navbar/Navbar';
import './List.css';
import ApprovedTable from '../../../Components/Login/Admin/Datatable/ApprovedTable';

const ApprovedList: React.FC = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ApprovedTable/>
      </div>
    </div>
  );
};

export default ApprovedList;
