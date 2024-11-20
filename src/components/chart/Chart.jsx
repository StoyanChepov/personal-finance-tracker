import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);
export default function Chart({ _id, options, data }) {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    if (hoveredId !== null) {
      navigate(`/charts/${hoveredId}/details`);
    }
  };

  return (
    <div
      key={_id}
      onMouseEnter={() => handleMouseEnter(_id)}
      onClick={handleClick}
    >
      <Line options={options} data={data} />
    </div>
  );
}
