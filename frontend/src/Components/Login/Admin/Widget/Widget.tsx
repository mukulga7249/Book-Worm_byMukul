import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import './Widget.css';
import axios from 'axios';

interface WidgetProps {
  type: 'SELLERS' | 'BUYERS'| 'BOOKS'| 'ORDERS' ;
}

const Widget: React.FC<WidgetProps> = ({ type }) => {
  let data: {
    title: string;
  };

  const [BUYERS, setBUYERS]= useState(0)
  const [SELLERS, setSELLERS]= useState(0)
  const [BOOKS, setBOOKS]= useState(0)
  const [ORDERS, setORDERS]= useState(0)


  // Temporary
  useEffect(() => {
    const BuyerCount = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/buyer/count');
        setBUYERS(response.data.totalCount);
        
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    BuyerCount();
  }, []);

  useEffect(() => {
    const SellerCount = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/seller/count');
        setSELLERS(response.data.totalCount);
        
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    SellerCount();
  }, []);

  
  useEffect(() => {
    const BookCount = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/books/count');
        setBOOKS(response.data.totalCount);
        
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    BookCount();
  }, []);
  
  
  useEffect(() => {
    const OrdersCount = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/orders/count');
        setORDERS(response.data.totalCount);
        
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    OrdersCount();
  }, []);
  
  

  switch (type) {
    case 'SELLERS':
      data = {
        title: 'SELLERS'
      };
      break;
    case 'BUYERS':
      data = {
        title: 'BUYERS',
      };
      break;

      case 'BOOKS':
        data = {
          title: 'BOOKS',
        };
        break;


        case 'ORDERS':
          data = {
            title: 'ORDERS',
          };
          break;
   
    default:
      data = {
        title: '',
      };
      break;
  }

  return (
    <div className="widget">
      <div className="center">
        <span className="title-widget">{data.title}</span>
        <span className="counter">{type=="BUYERS"? `${BUYERS}`: type=="SELLERS"?`${SELLERS}`:type==="BOOKS"?`${BOOKS}`:`${ORDERS}`}</span>
  
      </div>
      {/* <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div> */}
    </div>
  );
};

export default Widget;
