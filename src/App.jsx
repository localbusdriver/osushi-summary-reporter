/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import DoubleOrders from "@/components/pages/DoubleOrders";
import SummaryReporter from "@/components/pages/SummaryReporter";

import { Button } from "@/components/ui/button";

function App() {
  const [page, setPage] = useState("reporter");
  const [doubleOrderState, setDoubleOrderState] = useState({
    1: { noDoubles: "Please Upload File" },
  });
  const [summaryState, setSummaryState] = useState({
    1: { noSummary: "Please Paste Orders." },
  });

  return (
    <>
      <header className="bg-primary flex flex-col items-center justify-center p-8 w-full gap-4">
        <h1 className="font-bold text-2xl text-secondary">
          O'Sushi Summary Reporter
        </h1>
        <div className="flex flex-row justify-center gap-4 bg-[#f4f4f4] w-min mx-auto px-2 py-1 rounded-lg">
          <Button
            className={
              "text-lg " +
              (page === "reporter"
                ? "bg-white text-[#080808] shadow-xl hover:bg-white hover:text-[#080808]"
                : "bg-[#f4f4f4] text-[#727275] hover:bg-[#f4f4f4] hover:text-[#727275]")
            }
            onClick={() => setPage("reporter")}
          >
            Summary Reporter
          </Button>
          <Button
            className={
              "text-lg " +
              (page === "doubles"
                ? "bg-white text-[#080808] shadow-xl hover:bg-white hover:text-[#080808]"
                : "bg-[#f4f4f4] text-[#727275] hover:bg-[#f4f4f4] hover:text-[#727275]")
            }
            onClick={() => setPage("doubles")}
          >
            Double Orders
          </Button>
        </div>
      </header>
      <main className="bg-secondary min-h-screen p-8 ">
        {page === "reporter" ? (
          <SummaryReporter
            resultState={summaryState}
            setResultState={setSummaryState}
          />
        ) : (
          <DoubleOrders
            resultState={doubleOrderState}
            setResultState={setDoubleOrderState}
          />
        )}
      </main>
    </>
  );
}

export default App;
