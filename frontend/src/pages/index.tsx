import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";

const GenderChart = dynamic(() => import("../components/GenderChart/index"), {
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

  const { data: geo_name } = trpc.useQuery([
    "geoNames.getGeoNameByDGUID",
    { dguid: selectedDGUID },
  ]);

  const { data: summary } = trpc.useQuery([
    "summary.getSummaryByDGUID",
    { dguid: selectedDGUID },
  ]);
  const { data: ranks } = trpc.useQuery([
    "ranks.getDGUIDRank",
    { dguid: selectedDGUID },
  ]);
  console.log(geo_name);

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
                className="bg-gray-50 border border-gray-300 mb-2 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Census Geographic Units</option>
                <option value="province">Provincial</option>
                <option value="census division">Census Divisions</option>
                {/* <option value="census sub division">
                  Census Sub Divisions
                </option> */}
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

          <div className="m-1 p-4 bg-white rounded">
            <p className="text-xl font-bold">{geo_name?.geo_name} Summary</p>
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Stat
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                  >
                    Rank <br />
                    {geo_name?.geo_level === "province"
                      ? "out of all Provinces"
                      : "out of all CD's in the province"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-secondary border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Population
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {summary?.total_population_2021.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    # {ranks?.pop_rank}
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Population Growth
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {summary?.total_population_percentage_change_2016_to_2021}%
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    # {ranks?.pop_growth_rank}
                  </td>
                </tr>

                <tr className="bg-secondary border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Population Density
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {summary?.total_population_density_per_square_kilometre} per
                    km&sup2;
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    # {ranks?.pop_density_rank}
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Average Household Size
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {summary?.total_average_household_size} per home
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    # {ranks?.household_size_rank}
                  </td>
                </tr>

                <tr className="bg-secondary border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Median Age
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    <span>{summary?.total_median_age_of_the_population}</span>{" "}
                    Y/O
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    # {ranks?.age_rank}
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Median Income
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    $
                    {summary?.total_median_employment_income_in_2020_among_recipients.toLocaleString(
                      "en-US",
                      { maximumFractionDigits: 2 }
                    )}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    # {ranks?.income_rank}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="m-1 p-2 bg-white rounded">
            <p className="text-xl text-center">Age Chart</p>
            <GenderChart data={ageData} key1="male" key2="female" />
          </div>
          <div className="m-1 p-2 bg-white rounded">
            <p className="text-xl text-center">Income Chart</p>
            <GenderChart data={incomeData} key1="male" key2="female" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
