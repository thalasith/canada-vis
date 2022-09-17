import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// interface for item
interface Item {
  name: string;
  value: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white m-1 p-2 border border-primary">
        <p className="font-bold">{label}</p>
        {payload.map((item: Item) => {
          return (
            <p key={item.name}>
              {capitalizeFirstLetter(item.name)}:{" "}
              {Intl.NumberFormat("en").format(
                Math.round(100 * item.value) / 100
              ) + "%"}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};

const TestChart = ({ data, key1, key2 }: any) => {
  return (
    <ResponsiveContainer width="95%" height={400}>
      <BarChart
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
            return `${tick}%`;
          }}
        />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={key1} stackId="a" fill="#D62618" />
        <Bar dataKey={key2} stackId="a" fill="#FFBABA" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TestChart;
