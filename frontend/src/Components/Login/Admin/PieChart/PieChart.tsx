import { PieChart } from '@mui/x-charts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './PieChart.css'



const fetchBookGenres = async ()=> {
    try {
      // Update the URL to the endpoint where your books data can be fetched
      const response = await axios.get('http://localhost:5001/api/books/genre');
      return response.data.map((item: { count: any; genre: any; }, index: any) => ({
        id: index,
        value: item.count,
        label: item.genre,
      }));
    } catch (error) {
      console.error('Error fetching book genres:', error);
      return [];
    }
  };
export default function PieActiveArc() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const chartData = await fetchBookGenres();
        setData(chartData);
      };
  
      fetchData();
    }, []); 
  return (
    <div className="piechart-genre">
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