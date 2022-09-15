import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import { ResponsiveContainer } from "recharts";

const TestChart = dynamic(() => import("../components/BarChart/index"), {
  ssr: false,
});

const Map = dynamic(() => import("../components/Map/index"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [selectedDGUID, setSelectedDGUID] = useState("2021A000235");
  const [selectedGeographicUnit, setSelectedGeographicUnit] =
    useState("province");

  const { data: ageData } = trpc.useQuery([
    "ageData.getAgeDataByDGUID",
    { dguid: selectedDGUID },
  ]);
  const { data: incomeData } = trpc.useQuery([
    "incomeData.getIncomeDataByDGUID",
    { dguid: selectedDGUID },
  ]);
  console.log(incomeData);
  const { data: geo_name } = trpc.useQuery([
    "geoNames.getGeoNameByDGUID",
    { dguid: selectedDGUID },
  ]);
  const { data: summary } = trpc.useQuery([
    "summary.getSummaryByDGUID",
    { dguid: selectedDGUID },
  ]);

  return (
    <>
      <Head>
        <title>Canada Census Visualization</title>
        <meta name="description" content="Canada Census Visualization" />
        <link rel="icon" href="/man.png" />
      </Head>

      <Header />
      <main className="container mx-auto min-h-screen min-v-screen p-4 ">
        <div className="grid lg:grid-cols-2">
          <div className="m-1 p-2 bg-white rounded">
            <div className="relative w-full">
              <select
                onChange={(e) => {
                  setSelectedGeographicUnit(e.target.value);
                }}
                defaultValue={""}
                className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Census Geographic Units</option>
                <option value="province">Provincial</option>
                <option value="census division">Census Divisions</option>
                <option value="census subdivision">Census Sub Divisions</option>
              </select>
              <div>
                <Map
                  setSelectedDGUID={setSelectedDGUID}
                  selectedDGUID={selectedDGUID}
                  selectedGeographicUnit={selectedGeographicUnit}
                />
              </div>
            </div>
          </div>

          <div className="m-1 p-2 bg-white rounded">
            <p className="text-xl">Currently viewing: {geo_name}</p>
            <p className="">
              Population:{" "}
              {summary?.total_population_2021.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="">
              Population Growth since 2016:{" "}
              {summary?.total_population_percentage_change_2016_to_2021}%
            </p>
            <p className="">
              Population Density:{" "}
              {summary?.total_population_density_per_square_kilometre} per
              square kilometre
            </p>
            <p className="">
              Median Income: $
              {summary?.total_median_employment_income_in_2020_among_recipients.toLocaleString(
                "en-US",
                { maximumFractionDigits: 2 }
              )}
            </p>
            <p className="">
              Average Householdsize: {summary?.total_average_household_size}
            </p>
            <p>Median Age: {summary?.total_median_age_of_the_population}</p>
          </div>
          <div className="m-1 p-2 bg-white rounded">
            <p className="text-xl text-center">Age Chart</p>
            <TestChart data={ageData} key1="male" key2="female" />
          </div>
          <div className="m-1 p-2 bg-white rounded">
            <p className="text-xl text-center">Income Chart</p>
            <TestChart data={incomeData} key1="male" key2="female" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
