import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data }) => {
  const options = {
    chart: {
      type: "pie",
      outerWidth: 1500,
      outerHeight: 1500,
    },
    labels: data.map((item) => item.label),
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={data.map((item) => item.value)}
        type="pie"
        height={1500}
      />
    </div>
  );
};

const App = (props) => {
  // Sample data for the pie chart
  // console.log(props);
  const { data } = props;
  let spending = 0,
    earning = 0;
  data.forEach((item) => {
    if (item.type === 1) {
      earning += Number(item.amount);
    } else {
      spending += Number(item.amount);
    }
  });

  const row = [
    { label: "Earnings", value: earning },
    { label: "Spend", value: spending },
  ];

  return (
    <>
      <PieChart data={row} />
    </>
  );
};

export default App;
