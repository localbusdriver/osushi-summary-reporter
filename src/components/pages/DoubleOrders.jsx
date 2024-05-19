import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FileUp, UserRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DoubleOrders({ resultState, setResultState }) {
  const [file, setFile] = useState(resultState);
  const [results, setResults] = useState(resultState);

  const handleFileChange = (e) => {
    const fullFile = e.target.files[0];
    console.log("Reading File...");
    if (fullFile) {
      console.log("File", true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        setFile(text);
      };
      reader.readAsText(fullFile);
    }
  };

  useEffect(() => {
    if (!file) setResults({ 1: { noDoubles: "Please Upload File" } });
    else if (typeof file === "string" && file.trim().length > 0) {
      const lines = file.split("\n").map((line) => line.split(","));
      lines.shift();

      let res = {};
      // Member:0, Location:1, Item:6, Quantity:10, Organization:22
      lines.forEach((line, i) => {
        if (line[10] > 1) {
          const member = line[0];
          const location = line[1];
          const item = line[6];
          const quantity = line[10];
          const organization = line[22];
          res[i] = {
            member: member,
            roomNumber: location,
            item: item,
            quantity: quantity,
            organization: organization,
          };
        }
      });
      setResults(res);
      setResultState(res);
    }
  }, [file]);
  
  return (
    <div className="mt-5 ">
      <div className="mx-auto flex flex-row justify-between items-center w-fit flex-wrap">
        <div className="md:w-1/2 mt-4 flex flex-col gap-4 text-left">
          <Label htmlFor="customFile" className="text-xl w-max flex flex-row md:pr-52">
            <FileUp />
            &nbsp;Upload a&nbsp;
            <span className="text-[hsl(var(--excel-green))]">CSV</span>
            &nbsp;or&nbsp;
            <span className="text-[hsl(var(--excel-green))]">Excel</span>
            &nbsp;file&nbsp;
          </Label>
          <Input
            type="file"
            id="customFile"
            accept=".csv, application/vnd.ms-excel, .xlsx, .xls"
            className="w-fit"
            onChange={handleFileChange}
          />
        </div>
        <div className="md:w-1/2 mt-8 text-left ">
          <Card className="w-96">
            <CardHeader className="text-center pt-4 font-bold text-xl">
              Results
              <hr className="mt-2" />
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              {Object.entries(results).map(([key, result]) => (
                <div key={key} className="mb-4 flex flex-col gap-2">
                  {result.member ? (
                    <>
                      <CardTitle className="text-xl flex flex-row">
                        <UserRound />
                        &nbsp;{result.member}
                      </CardTitle>

                      <p>
                        <span className="text-[#598a5b] font-bold">
                          Room no:{" "}
                        </span>
                        &nbsp;
                        {result.roomNumber}
                      </p>
                      <p>
                        <span className="text-[#3572a9] font-bold">Item:</span>
                        &nbsp; {result.item}
                      </p>
                      <p>
                        <span className="text-[#955e7b] font-bold">
                          Quantity:
                        </span>
                        &nbsp; {result.quantity}
                      </p>
                      <p>
                        <span className="text-[#4868a0] font-bold">
                          Organization:
                        </span>
                        &nbsp; {result.organization}
                      </p>
                      <hr className="my-4" />
                    </>
                  ) : (
                    ""
                  )}

                  {result.noDoubles ? (
                    <h6 className="text-xl mt-8 text-center">
                      {result.noDoubles}
                    </h6>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

DoubleOrders.propTypes = {
  resultState: PropTypes.object,
  setResultState: PropTypes.func,
};
