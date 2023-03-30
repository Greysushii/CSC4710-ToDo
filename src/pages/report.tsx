import { type NextPage } from "next";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { CgSpinner } from "react-icons/cg";

import type { DateValueType } from "~/types/react-datepicker-types";
import { api } from "~/utils/api";
import LinksContainer from "~/components/containers/LinksContainer/LinksContainer";
import Button from "~/components/Button";
import ReportContainer from "~/components/containers/ReportContainer/ReportContainer";
import Navbar from "~/components/navigation/Navbar";
const Datepicker = dynamic(() => import("react-tailwindcss-datepicker"), {
  ssr: false,
});

const Report: NextPage = () => {
  useEffect(() => toast.dismiss(), []); // Dismiss toasts from other pages.

  const CURRENT_DATE = new Date(); // Get the current date and set dateValue state
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: CURRENT_DATE,
    endDate: null,
  });

  const report = api.todo.generateReport.useQuery(
    {
      startDate: dayjs(dateValue?.startDate).toDate(),
      endDate: dayjs(dateValue?.endDate).toDate(),
    },
    { enabled: false }
  );

  return (
    <>
      <Head>
        <title>Generate Report</title>
        <meta name="description" content="Generate task reports" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-40">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Generate <span className="text-[hsl(280,100%,70%)]">Report</span>
          </h1>
          <LinksContainer />
        </div>
        <div className="flex w-2/6 gap-4">
          <Datepicker
            useRange={false}
            readOnly={true}
            separator="to"
            primaryColor="purple"
            inputClassName="font-normal text-xl outline-none bg-white"
            value={dateValue}
            onChange={(value) => setDateValue(value)}
            displayFormat="MM/DD/YYYY"
          />
          <Button
            type="button"
            disabled={
              (dateValue?.endDate === null &&
                dateValue?.endDate !== undefined) ||
              report.isFetching
            }
            onClick={() => void report.refetch()}
          >
            Generate Report
          </Button>
        </div>
        <div className="mt-8">
          {report.isFetching && (
            <div className="flex flex-col items-center justify-center">
              <CgSpinner className="animate-spin text-white" size={80} />
              <p className="animate-pulse text-xl text-white">
                Generating report...
              </p>
            </div>
          )}
          {report.isError && (
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-xl font-semibold text-amber-500">
                There was an error fetching the report.
              </p>
              <button
                className="text-xl text-amber-500 underline hover:text-amber-300"
                onClick={() => void report.refetch()}
              >
                Try again?
              </button>
            </div>
          )}
          {report.isFetched && report.isSuccess && (
            <ReportContainer
              startDate={dayjs(dateValue?.startDate).toDate()}
              endDate={dayjs(dateValue?.endDate).toDate()}
              tasks={report.data}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Report;
