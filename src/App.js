import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

import SummaryReporter from "./components/SummaryReporter";
import DoubleOrders from "./components/DoubleOrders";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [func, setFunc] = useState("summary-reporter");
  const [doubleOrderState, setDoubleOrderState] = useState({
    1: { noDoubles: "Please Upload File" },
  });
  const [summaryState, setSummaryState] = useState({
    1: { noSummary: "Please Paste Orders." },
  });
  const [fs, setFs] = useState(18);
  useEffect(() => {
    setFunc("summary-reporter");
    // setFunc("double-order");
  }, []);

  const handleFuncChange = (e) => {
    const selection = e.target.innerText.toLowerCase().replace(" ", "-");
    setFunc(selection);
  };

  const handleFsIncrement = (e) => {
    if (e.target.innerText === "+") {
      setFs((prev) => prev + 4);
    } else {
      setFs((prev) => (prev > 4 ? prev - 4 : prev));
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>O'Sushi Summary Reporter</h1>
        <ButtonGroup className="mt-3">
          <Button
            variant={func === "summary-reporter" ? "primary" : "secondary"}
            onClick={handleFuncChange}
          >
            Summary Reporter
          </Button>
          <Button
            variant={func === "double-order" ? "primary" : "secondary"}
            onClick={handleFuncChange}
          >
            Double Order
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mt-3">
          <label className="mr-5">Font Size:&nbsp;&nbsp;</label>
          <Button variant="danger" onClick={handleFsIncrement}>
            -
          </Button>
          <Button variant="primary" onClick={handleFsIncrement}>
            +
          </Button>
        </ButtonGroup>
      </header>
      <main>
        {func === "summary-reporter" ? (
          <SummaryReporter
            resultState={summaryState}
            setResultState={setSummaryState}
            fs={fs}
          />
        ) : (
          <DoubleOrders
            resultState={doubleOrderState}
            setResultState={setDoubleOrderState}
            fs={fs}
          />
        )}
      </main>
    </div>
  );
}

export default App;
