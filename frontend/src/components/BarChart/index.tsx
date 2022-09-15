import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TestChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="95%" height={400}>
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(tick) => {
            return tick.toLocaleString("en");
          }}
        />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat("en").format(value)
          }
        />
        <Legend />
        <Bar dataKey="male" stackId="a" fill="#D62618" />
        <Bar dataKey="female" stackId="a" fill="#FFBABA" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TestChart;
