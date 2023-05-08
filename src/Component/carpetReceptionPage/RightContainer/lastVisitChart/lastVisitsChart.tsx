import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LastVisitsChartProps {
  userCarpetReceptions: any[]
}

export function LastVisitsChart({ userCarpetReceptions }: LastVisitsChartProps) {
  const [chartData, setChartData] = useState<Record<string, any>>({});
  
  useEffect(() => {
    if (userCarpetReceptions !== undefined) {
      const data = userCarpetReceptions.slice(-10)
        .reduce((previousValue: any, currentValue: any): { labels: any; carpets: any; tracks: any; } => {
          let carpets = currentValue.numberOfCarpet ? currentValue.numberOfCarpet : ''
          let tracks = currentValue.numberOfTracks ? currentValue.numberOfTracks : ''
          let labels = currentValue.dateAt.slice(0, 10)
          return {
            labels: [...previousValue.labels, labels],
            carpets: [...previousValue.carpets, carpets],
            tracks: [...previousValue.tracks, tracks]
          }
        }, {
          labels: [],
          carpets: [],
          tracks: []
        });

      setChartData(data);
    }
  }, [userCarpetReceptions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      dataLabels: {
        display: true
      }
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Tepisi',
        data: chartData.carpets,
        backgroundColor: '#fec400',
      },
      {
        label: 'Staze',
        data: chartData.tracks,
        backgroundColor: '#793ea5',
      },
    ],
  };
  
  return (
    <Bar options={options} data={data} />
  )
}