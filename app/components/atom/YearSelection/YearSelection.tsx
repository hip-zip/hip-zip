import React from "react";
import { useRouter } from "next/navigation";

const YearSelection = (props: { setScrollLocation: Function }) => {
  const router = useRouter();
  const year: number[] = [2023, 2022, 2021, 2020];

  return (
    <div className={"flex justify-center items-center gap-2 p-6"}>
      {year.map((year: number) => (
        <button
          key={year}
          className="flex items-center justify-center overflow-hidden text-sm font-medium text-white rounded-lg group bg-transparent border-2 border-opacity-75 border-white hover:border-opacity-100 focus:border-opacity-100 dark:text-white focus:ring-4 focus:outline-none focus:ring-opacity-50"
          onClick={() => {
            props.setScrollLocation(0);
            router.push(`/main/?year=${year}`);
          }}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0">
            {year}
          </span>
        </button>
      ))}
    </div>
  );
};

export default YearSelection;
