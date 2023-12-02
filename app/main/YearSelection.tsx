import React from "react";
import { useRouter } from "next/navigation";

const YearSelection = (props: { setScrollLocation: Function }) => {
  const router = useRouter();
  const year: number[] = [2023, 2022, 2021, 2020];

  return (
    <div className={"flex justify-center items-center mb-8"}>
      {year.map((year: number) => (
        <button
          key={year}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          onClick={() => {
            props.setScrollLocation(0);
            router.push(`/main/?year=${year}`);
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {year}
          </span>
        </button>
      ))}
    </div>
  );
};

export default YearSelection;
