import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { trpc } from "../utils/trpc";

const TestChart = dynamic(() => import("../components/BarChart/index"), {
  ssr: false,
});

const Map = dynamic(() => import("../components/Map/index"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [selectedDGUID, setSelectedDGUID] = useState("2021A000235");

  const { data: ageData } = trpc.useQuery([
    "ageData.getAgeDataByDGUID",
    { dguid: selectedDGUID },
  ]);
  const { data: geo_name } = trpc.useQuery([
    "geoNames.getGeoNameByDGUID",
    { dguid: selectedDGUID },
  ]);
  const { data: provinces } = trpc.useQuery([
    "geoAreas.getAllProvinces",
    { geo_level: "provinces" },
  ]);

  return (
    <>
      <Head>
        <title>Canada Census Visualization</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/man.png" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-3/4 h-1/2">
          <Map setSelectedDGUID={setSelectedDGUID} />
        </div>
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <div className="w-3/4 h-1/2">
          Hello {geo_name}
          <TestChart ageData={ageData} />
        </div>
      </main>
    </>
  );
};

export default Home;
