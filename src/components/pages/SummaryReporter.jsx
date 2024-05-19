import { useState } from "react";
import PropTypes from "prop-types";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

export default function SummaryReporter({ resultState, setResultState }) {
  const [orders, setOrders] = useState("");
  const [results, setResults] = useState(resultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orders.trim().length > 0) {
      let final = {};
      orders.split("\n").forEach((line) => {
        const parts = line.split("\t");
        if (parts.length > 1) {
          const numOfOrders = parseInt(parts.shift());
          const temp = parts[0].split("-");
          const item = temp[0].trim();
          const match = temp[1].match(/\d+/);
          const numOfPieces = match ? parseInt(match[0], 10) : 0;

          const pieces = numOfOrders * numOfPieces;
          const rolls = pieces / 10;

          if (final["Total Rolls"]) final["Total Rolls"] += rolls;
          else final["Total Rolls"] = rolls;

          if (final["Total Pieces"]) final["Total Pieces"] += pieces;
          else final["Total Pieces"] = pieces;

          if (item === "Mixed") {
            if (!final["Chicken teriyaki"]) {
              final["Chicken teriyaki"] = {
                rolls: rolls / 2,
                pieces: pieces / 2,
              };
            } else {
              final["Chicken teriyaki"].rolls += rolls / 2;
              final["Chicken teriyaki"].pieces += pieces / 2;
            }
            if (!final["Salmon & Avocado"]) {
              final["Salmon & Avocado"] = {
                rolls: rolls / 2,
                pieces: pieces / 2,
              };
            } else {
              final["Salmon & Avocado"].rolls += rolls / 2;
              final["Salmon & Avocado"].pieces += pieces / 2;
            }
          } else if (final[item]) {
            final[item].rolls += rolls;
            final[item].pieces += pieces;
          } else {
            final[item] = { rolls: rolls, pieces: pieces };
          }
        }
      });

      console.log(final);
      setResults(final);
      setResultState(final);
    }
  };

  return (
    <div className="mt-5">
      <div className="mx-auto flex flex-row justify-between items-center flex-wrap ">
        <div className="md:w-1/2 mt-4 flex flex-col items-center">
          <div className="flex flex-col gap-4">
            <Label htmlFor="report" className="text-xl text-left">
              Paste the report
            </Label>
            <Textarea
              type="text"
              placeholder="Paste the report here"
              id="report"
              className="w-80"
              onChange={(e) => setOrders(e.target.value)}
            />
            <div className="flex flex-row gap-2">
              <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
              <Button
                variant="destructive"
                onClick={() => (document.getElementById("report").value = "")}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 text-left">
          <Table className="w-96 border border-black mx-auto">
            <TableCaption>Report Summary</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]" colSpan={2}>
                  Item
                </TableHead>
                <TableHead className="text-right">Rolls</TableHead>
                <TableHead className="text-right">Pieces</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results
                ? Object.entries(results).map(([item, obj]) =>
                    item !== "Total Rolls" && item !== "Total Pieces" ? (
                      <TableRow key={item}>
                        <TableCell className="font-medium" colSpan={2}>
                          {item ? item : ""}
                        </TableCell>
                        <TableCell className="text-right">
                          {obj.rolls ? Math.round(obj.rolls * 10) / 10 : ""}
                        </TableCell>
                        <TableCell className="text-right">
                          {obj.pieces ? obj.pieces : ""}
                        </TableCell>
                      </TableRow>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">
                  {" "}
                  {results["Total Rolls"]
                    ? Math.round(results["Total Rolls"] * 10) / 10
                    : ""}
                </TableCell>
                <TableCell className="text-right">
                  {results["Total Pieces"] ? results["Total Pieces"] : ""}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
SummaryReporter.propTypes = {
  resultState: PropTypes.object,
  setResultState: PropTypes.func,
};
