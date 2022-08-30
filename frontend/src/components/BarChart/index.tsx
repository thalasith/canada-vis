import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AgeDataShape {
  name: string;
  male: number;
  female: number;
}

const TestChart = ({ ageData }: any) => {
  return (
    <div className="w-full">
      <BarChart
        width={1000}
        height={300}
        data={ageData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value: any) => new Intl.NumberFormat("en").format(value)}
        />
        <Legend />
        <Bar dataKey="male" stackId="a" fill="#8884d8" />
        <Bar dataKey="female" stackId="a" fill="#82ca9d" />
      </BarChart>
    </div>
    // <ResponsiveContainer width="100%" height="100%">
    //   <BarChart
    //     width={500}
    //     height={300}
    //     data={data}
    //     margin={{
    //       top: 20,
    //       right: 30,
    //       left: 20,
    //       bottom: 5,
    //     }}
    //   >
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey="name" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Bar dataKey="pv" stackId="a" fill="#8884d8" />
    //     <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
    //   </BarChart>
    // </ResponsiveContainer>
  );
};

export default TestChart;
