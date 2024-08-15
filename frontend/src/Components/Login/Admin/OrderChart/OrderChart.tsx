import { PieChart } from '@mui/x-charts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './OrderChart.css'



const fetchOrdersStatus = async ()=> {
    try {
      // Update the URL to the endpoint where your books data can be fetched
      const response = await axios.get('http://localhost:5001/api/orders/status');
      return response.data.map((item: { count: any; status: any; }, index: any) => ({
        id: index,
        value: item.count,
        label: item.status,
      }));
    } catch (error) {
      console.error('Error fetching book orders:', error);
      return [];
    }
  };
export default function PieActiveArcOrders() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const chartData = await fetchOrdersStatus();
        setData(chartData);
      };
  
      fetchData();
    }, []); 
  return (
    <div className="piechart-orders">
       <PieChart
    series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />

    </div>
   
  );
}