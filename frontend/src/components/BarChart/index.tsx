import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

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
    </div>
  );
};

export default TestChart;
